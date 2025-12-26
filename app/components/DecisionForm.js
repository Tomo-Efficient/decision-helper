'use client'
import { useState } from 'react'
import { Send, Loader2, Plus, X } from 'lucide-react'

export default function DecisionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    situation: '',
    emotion: '焦虑',
    urgency: 5,
    options: ['', '']
  })

  const emotions = [
    { value: '焦虑', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: '愤怒', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: '悲伤', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: '压力', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: '困惑', color: 'bg-gray-100 text-gray-800 border-gray-200' },
    { value: '恐惧', color: 'bg-orange-100 text-orange-800 border-orange-200' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }))
  }

  const removeOption = (index) => {
    if (formData.options.length <= 2) return
    const newOptions = [...formData.options]
    newOptions.splice(index, 1)
    setFormData({...formData, options: newOptions})
  }

  const updateOption = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({...formData, options: newOptions})
  }

  // 测试数据
  const testCases = [
    {
      title: "工作选择",
      data: {
        situation: "收到两个工作机会：一个是创业公司，薪资高但风险大；另一个是大公司，稳定但成长慢。我担心选错会影响职业生涯发展。",
        emotion: "焦虑",
        urgency: 7,
        options: ["加入创业公司接受挑战", "选择大公司求稳定", "继续寻找更好的机会"]
      }
    },
    {
      title: "感情决策",
      data: {
        situation: "和伴侣的关系进入了瓶颈期，经常因为小事争吵。我不知道是否应该继续努力修复关系，还是应该选择分开。",
        emotion: "困惑",
        urgency: 6,
        options: ["寻求专业情感咨询", "提出暂时分开冷静", "主动沟通尝试修复"]
      }
    },
    {
      title: "投资决定",
      data: {
        situation: "有一笔积蓄想要投资，朋友推荐了一个项目收益很高但风险也大。我既想获得收益又担心亏损，整晚都在想这个事情。",
        emotion: "恐惧",
        urgency: 5,
        options: ["冒险投资追求高回报", "选择稳健的理财产品", "分散投资降低风险"]
      }
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">描述你的决策困境</h2>
        <p className="text-gray-600">详细描述你的情况，我们会提供个性化的分析和建议</p>
      </div>

      {/* 快速测试按钮 */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <div className="w-2 h-5 bg-blue-500 rounded-full mr-2"></div>
          <h3 className="font-medium text-gray-700">快速测试（点击填充示例）</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {testCases.map((test, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setFormData(test.data)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              {test.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 情境描述 */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            1. 发生了什么？请详细描述
          </label>
          <textarea
            value={formData.situation}
            onChange={(e) => setFormData({...formData, situation: e.target.value})}
            className="w-full h-40 p-5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="请详细描述你面临的具体情况、背景和困扰..."
            required
          />
          <p className="text-sm text-gray-500 mt-2">越详细的分析结果越准确</p>
        </div>

        {/* 情绪选择 */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            2. 你现在的情绪状态
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {emotions.map(emotion => (
              <button
                key={emotion.value}
                type="button"
                onClick={() => setFormData({...formData, emotion: emotion.value})}
                className={`py-3 rounded-xl border-2 transition-all ${formData.emotion === emotion.value ? `${emotion.color} border-opacity-100 scale-105` : 'bg-white border-gray-200 hover:bg-gray-50'}`}
              >
                {emotion.value}
              </button>
            ))}
          </div>
        </div>

        {/* 紧急程度 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-lg font-semibold text-gray-800">
              3. 决策紧急程度
            </label>
            <span className="text-2xl font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full">
              {formData.urgency}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.urgency}
            onChange={(e) => setFormData({...formData, urgency: parseInt(e.target.value)})}
            className="w-full h-3 bg-gray-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>可以慢慢考虑</span>
            <span className="font-medium">中等紧急</span>
            <span>必须立刻决定</span>
          </div>
        </div>

        {/* 选项输入 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-lg font-semibold text-gray-800">
              4. 你的备选方案
            </label>
            <button
              type="button"
              onClick={addOption}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4 mr-1" />
              添加选项
            </button>
          </div>
          <div className="space-y-4">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center group">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl font-bold mr-4 flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder={`输入选项 ${String.fromCharCode(65 + index)} 的具体内容...`}
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="ml-3 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={isLoading || !formData.situation.trim()}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              正在分析中...
            </>
          ) : (
            <>
              <Send className="w-6 h-6 mr-3" />
              获取个性化分析和建议
            </>
          )}
        </button>

        <p className="text-center text-gray-500 text-sm">
          提交后，我们将在1-2秒内为你生成分析报告
        </p>
      </form>
    </div>
  )
}