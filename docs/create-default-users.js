// Script to create default users in Supabase
// Run with: node create-default-users.js
// Requires: npm install @supabase/supabase-js

const { createClient } = require('@supabase/supabase-js')

// Replace with your Supabase URL and Anon Key
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

const supabase = createClient(supabaseUrl, supabaseKey)

const defaultUsers = [
  { username: 'kuzey', password: '202020' },
  { username: 'yasar', password: '198419' },
  { username: 'ruzgar', password: '201620' }
]

async function createDefaultUsers() {
  for (const user of defaultUsers) {
    const email = `${user.username}@pokemon-explorer.local`
    
    console.log(`Creating user: ${user.username}`)
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password: user.password,
    })

    if (error) {
      console.error(`Error creating ${user.username}:`, error.message)
    } else {
      console.log(`Successfully created ${user.username}`)
    }
  }
}

createDefaultUsers()
