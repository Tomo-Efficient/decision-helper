'use client'
import { CheckCircle, AlertCircle, Brain, Zap } from 'lucide-react'

export default function AdviceCard({ type, title, advice, color = 'blue' }) {
  const isImmediate = type === 'immediate'
  const Icon = isImmediate ? AlertCircle : Brain
  const SubIcon = isImmediate ? Zap : CheckCircle

  const colorConfig = {
    orange: {
      bg: 'from-orange-500 to-amber-500',
      light: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700'
    },
    blue: {
      bg: 'from-blue-500 to-cyan-500',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700'
    },
    purple: {
      bg: 'from-purple-500 to-pink-500',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700'
    }
  }

  const colors = colorConfig[color] || colorConfig.blue

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border ${colors.border} hover:shadow-2xl transition-shadow duration-300`}>
      <div className="flex items-center mb-8">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mr-4`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.light} ${colors.text} mt-2`}>
            <SubIcon className="w-3 h-3 mr-1" />
            {isImmediate ? '立即执行' : '理性思考'}
          </div>
        </div>
      </div>

      {advice?.length > 0 ? (
        <div className="space-y-5">
          {advice.map((item, index) => (
            <div key={index} className="flex items-start group">
              <div className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center mr-4 mt-0.5 flex-shrink-0`}>
                <div className={`w-3 h-3 rounded-full ${colors.text}`}></div>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-lg leading-relaxed">{item}</p>
                <div className={`h-1 w-0 group-hover:w-full ${colors.light} rounded-full mt-3 transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">暂无建议，请先提交分析请求</p>
        </div>
      )}

      <div className={`mt-8 pt-6 border-t ${colors.border}`}>
        <p className={`text-sm ${colors.text} font-medium`}>
          {isImmediate
            ? '💡 提示：这些建议旨在立即平复情绪，为理性决策做准备'
            : '💡 提示：在情绪平稳后使用这些理性分析方法'
          }
        </p>
      </div>
    </div>
  )
}