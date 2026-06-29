// Script to create default users in Supabase
// Run with: node create-default-users.js
// Requires: npm install @supabase/supabase-js

const { createClient } = require('@supabase/supabase-js')

// Replace with your Supabase URL and Anon Key
const supabaseUrl = 'https://vcnfschdycvesztbshpj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjbmZzY2hkeWN2ZXN6dGJzaHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDU2NzMsImV4cCI6MjA5ODI4MTY3M30.hIKHT4rKNSK88KJ_-O31nu3XPOulcMuBehSE_d_RifI'

const supabase = createClient(supabaseUrl, supabaseKey)

const defaultUsers = [
  { username: 'kuzey', password: '202020', pokemonPoints: 100000 },
  { username: 'yasar', password: '198419', pokemonPoints: 10000 },
  { username: 'ruzgar', password: '201620', pokemonPoints: 10000 }
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
      
      // Update profile with pokemon points
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ pokemon_points: user.pokemonPoints })
          .eq('id', data.user.id)
        
        if (profileError) {
          console.error(`Error updating pokemon points for ${user.username}:`, profileError.message)
        } else {
          console.log(`Set pokemon points for ${user.username}: ${user.pokemonPoints}`)
        }
      }
    }
  }
}

createDefaultUsers()
