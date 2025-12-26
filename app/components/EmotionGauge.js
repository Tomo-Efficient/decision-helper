'use client'
import { Gauge, AlertCircle, TrendingUp } from 'lucide-react'

export default function EmotionGauge({ emotions }) {
  const intensity = emotions?.intensity || 5

  const getIntensityColor = (value) => {
    if (value >= 8) return 'from-red-500 to-pink-500'
    if (value >= 6) return 'from-orange-500 to-red-500'
    if (value >= 4) return 'from-yellow-500 to-orange-500'
    return 'from-green-500 to-emerald-500'
  }

  const getIntensityText = (value) => {
    if (value >= 8) return '高情绪强度'
    if (value >= 6) return '中等偏上'
    if (value >= 4) return '中等强度'
    return '情绪相对平稳'
  }

  const getIntensityDescription = (value) => {
    if (value >= 8) return '情绪强烈，建议先进行情绪调节'
    if (value >= 6) return '情绪较强烈，需要一些时间平复'
    if (value >= 4) return '情绪适中，可以开始理性思考'
    return '情绪平稳，适合做决策'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
            <Gauge className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">情绪状态分析</h3>
            <p className="text-gray-600">基于你的描述生成的情绪报告</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getIntensityColor(intensity)} text-white`}>
          {getIntensityText(intensity)}
        </div>
      </div>

      <div className="space-y-8">
        {/* 情绪强度仪表 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></div>
              情绪强度分析
            </h4>
            <div className="text-3xl font-bold text-gray-800">{intensity}<span className="text-lg text-gray-500">/10</span></div>
          </div>

          <div className="mb-4">
            <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getIntensityColor(intensity)} transition-all duration-1000 ease-out`}
                style={{ width: `${intensity * 10}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>平静</span>
              <span>适中</span>
              <span>强烈</span>
            </div>
          </div>

          <p className="text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
            {getIntensityDescription(intensity)}
          </p>
        </div>

        {/* 检测到的情绪 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
            检测到的情绪类型
          </h4>
          <div className="flex flex-wrap gap-3">
            {emotions?.detected?.map((emo, idx) => (
              <span
                key={idx}
                className="px-5 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 font-semibold border border-blue-100"
              >
                {emo}
              </span>
            ))}
          </div>
        </div>

        {/* 影响因素 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
            可能的影响因素
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emotions?.influences?.map((inf, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-800 font-medium">{inf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}