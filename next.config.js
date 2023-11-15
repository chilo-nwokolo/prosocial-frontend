/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
  ...withPWA({
    dest: 'public',
  })
}

module.exports = nextConfig
// const withPWA = require('next-pwa')({
//   dest: 'public',
// })

// module.exports = withPWA({
//   // config
// })