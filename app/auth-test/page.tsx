// Test page to debug Google OAuth
export default function AuthTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Google OAuth Test</h1>
      <div className="space-y-4">
        <div>
          <strong>Environment Variables:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            NEXTAUTH_URL: {process.env.NEXTAUTH_URL}
            <br />
            GOOGLE_CLIENT_ID: {process.env.GOOGLE_CLIENT_ID?.substring(0, 20)}...
            <br />
            GOOGLE_CLIENT_SECRET: {process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set'}
          </pre>
        </div>
        <div>
          <strong>Expected Google Redirect URI:</strong>
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded">
            {process.env.NEXTAUTH_URL}/api/auth/callback/google
          </code>
        </div>
        <div className="mt-6">
          <a 
            href="/api/auth/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Login
          </a>
        </div>
      </div>
    </div>
  )
}
