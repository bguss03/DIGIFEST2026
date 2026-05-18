import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json().catch(() => null)
    console.log('Received submission body:', JSON.stringify(body))

    if (!body) {
      throw new Error('Request body is empty or invalid JSON')
    }

    const { formData, turnstileToken } = body

    if (!turnstileToken) {
      throw new Error('Turnstile token is required')
    }

    const turnstileSecret = Deno.env.get('TURNSTILE_SECRET_KEY')
    
    if (!turnstileSecret) {
      console.error('Environment variable TURNSTILE_SECRET_KEY is missing')
      throw new Error('Server configuration error: missing secret key')
    }

    console.log('Verifying Turnstile token...')
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileToken)}`,
      }
    )

    const outcome = await verifyResponse.json()
    console.log('Turnstile verification outcome:', JSON.stringify(outcome))
    
    if (!outcome.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Verifikasi keamanan (Turnstile) gagal. Silakan coba lagi.',
          details: outcome['error-codes'] || []
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('Supabase environment variables are missing')
      throw new Error('Server configuration error: missing database credentials')
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          persistSession: false,
        },
      }
    )

    console.log('Inserting submission into database...')
    const { error: insertError } = await supabaseAdmin
      .from('submissions_karya') // TARGET TABLE FOR KARYA
      .insert(formData)

    if (insertError) {
      console.error('Database insert error:', JSON.stringify(insertError))
      throw insertError
    }

    console.log('Submission successful!')
    return new Response(
      JSON.stringify({ message: 'Karya berhasil dikumpulkan' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message || String(error) }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
