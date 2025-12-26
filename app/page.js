'use client'
import { useState } from 'react'
import DecisionForm from './components/DecisionForm'
import EmotionGauge from './components/EmotionGauge'
import AdviceCard from './components/AdviceCard'
import BreathingGuide from './components/BreathingGuide'
import { Brain, Heart, Shield, Zap, Target, Users } from 'lucide-react'

export default function Home() {
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async (data) => {
    setIsLoading(true)

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1200))

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('请求失败')
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error('分析失败:', error)
      // 使用模拟数据作为后备
      setAnalysis({
        emotionAnalysis: {
          primary: data.emotion,
          intensity: Math.min(10, Math.floor(data.situation.length / 50) + 5),
          detected: [data.emotion, '压力'],
          influences: ['工作压力', '时间限制']
        },
        immediateAdvice: [
          '深呼吸5次：吸气4秒，呼气6秒',
          '站起来活动一下身体',
          '喝一杯温水，让自己平静下来'
        ],
        rationalAdvice: [
          '为每个选项列出三个优点和三个缺点',
          '考虑这个决定最晚可以什么时候做',
          '想象如果是你最好的朋友面临这个选择，你会怎么建议'
        ],
        cognitiveBiases: ['损失厌恶', '现状偏差'],
        recommendedOption: data.options[0] || '暂时不做决定',
        followUpQuestions: [
          '这个决定真的需要现在做吗？',
          '如果什么都不做，会发生什么？',
          '你内心最深处的声音是什么？'
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Brain,
      title: '情绪分析',
      desc: '识别你的情绪状态和强度',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: '共情支持',
      desc: '理解你的感受，提供情感支持',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: '认知偏差检测',
      desc: '识别可能影响决策的思维偏差',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: '即时建议',
      desc: '提供立即可以执行的行动步骤',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Target,
      title: '理性分析',
      desc: '帮助你在情绪平静后理性思考',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Users,
      title: '社会支持',
      desc: '建议如何寻求他人帮助和建议',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6 shadow-lg">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            当情绪影响判断时
          </span>
          <br />
          <span className="text-gray-800">做出更好的决策</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          我们理解强烈的情绪会影响决策质量。这个工具首先帮助你平复情绪，然后提供理性的分析框架，让你在压力下也能做出明智的选择。
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <DecisionForm onSubmit={handleAnalyze} isLoading={isLoading} />

          {analysis && (
            <>
              <EmotionGauge emotions={analysis.emotionAnalysis} />

              <div className="grid md:grid-cols-2 gap-6">
                <AdviceCard
                  type="immediate"
                  title="立即行动建议"
                  advice={analysis.immediateAdvice}
                  color="orange"
                />
                <AdviceCard
                  type="rational"
                  title="理性决策建议"
                  advice={analysis.rationalAdvice}
                  color="blue"
                />
              </div>

              {/* Additional Analysis */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-l-purple-400">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-500" />
                  认知偏差识别
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {analysis.cognitiveBiases.map((bias, idx) => (
                    <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
                      {bias}
                    </span>
                  ))}
                </div>

                <h4 className="font-bold text-lg mb-3 text-gray-800">推荐选项</h4>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-gray-700 leading-relaxed">{analysis.recommendedOption}</p>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-lg mb-3 text-gray-800">深入思考的问题</h4>
                  <div className="space-y-3">
                    {analysis.followUpQuestions.map((question, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Tools & Resources */}
        <div className="space-y-8">
          <BreathingGuide />

          {/* Decision Checklist */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-500" />
              决策前检查清单
            </h3>
            <div className="space-y-4">
              {[
                { text: '我是否在冷静的状态下做决定？', hint: '情绪激动时不要做重大决定' },
                { text: '我考虑了哪些替代方案？', hint: '至少考虑3个不同的选择' },
                { text: '这个决定可以推迟吗？', hint: '给自己足够的思考时间' },
                { text: '我咨询过信任的人吗？', hint: '寻求不同的视角' },
                { text: '最坏的结果我能接受吗？', hint: '做好最坏打算' },
                { text: '这个决定会如何影响我的价值观？', hint: '保持与价值观一致' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 rounded-xl p-4 border border-white">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">{item.text}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.hint}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-green-500" />
              快速决策技巧
            </h3>
            <div className="space-y-4">
              {[
                '使用10-10-10法则：这个决定在10分钟/10个月/10年后会怎样？',
                '设置决策时限：避免过度思考',
                '先处理情绪：情绪平稳后再做决定',
                '考虑机会成本：选择A意味着放弃什么？',
                '区分事实和感受：基于事实做决定',
                '从小处开始：先尝试小规模测试'
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}