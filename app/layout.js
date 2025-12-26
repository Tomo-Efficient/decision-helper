import { Inter } from 'next/font/google'
import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '决策焦虑助手 - 在情绪中做出更好选择',
  description: '当你情绪化时，帮你冷静分析，做出理性决策',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className="bg-gradient-to-br from-blue-50 to-purple-50">
      <body className={`${inter.className} min-h-screen`}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">决策焦虑助手</h1>
                  <p className="text-sm text-gray-600 hidden md:block">在情绪中做出理性选择</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">首页</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">情绪日志</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">决策工具</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">关于我们</a>
              </nav>
              <button className="md:hidden text-gray-700 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t bg-white mt-16 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">决策焦虑助手</h3>
                <p className="text-gray-600 mt-1">帮助你做出更好的决定</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto mb-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-red-600 text-sm font-bold">!</span>
                  </div>
                  <h4 className="font-bold text-red-700 text-lg">重要提示</h4>
                </div>
                <p className="text-gray-700 mb-4 text-center">
                  本工具不能替代专业心理咨询。如果你的情绪问题持续影响生活，请寻求专业帮助。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="tel:4001619995" className="bg-white border border-red-300 rounded-lg p-3 text-center font-medium text-red-600 hover:bg-red-50 transition">
                    📞 心理援助热线: 400-161-9995
                  </a>
                  <a href="tel:12320" className="bg-white border border-gray-300 rounded-lg p-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition">
                    🏥 卫生热线: 12320
                  </a>
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} 决策焦虑助手. 保留所有权利.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}