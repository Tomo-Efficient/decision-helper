import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    const { situation, emotion, urgency, options } = await request.json()

    // 情绪分析逻辑
    const analyzeEmotion = (text, selectedEmotion) => {
      const emotionKeywords = {
        焦虑: ['紧张', '不安', '担忧', '害怕', '担心', '焦虑', '睡不着'],
        愤怒: ['生气', '发火', '恼火', '烦躁', '愤怒', '气死了', '火大'],
        悲伤: ['难过', '伤心', '沮丧', '失落', '悲伤', '想哭', '绝望'],
        压力: ['累', '压力', '疲惫', '受不了', '崩溃', '压抑', '沉重'],
        困惑: ['迷茫', '困惑', '不知道', '犹豫', '纠结', '矛盾', '两难'],
        恐惧: ['害怕', '恐惧', '恐慌', '担心', '不安', '吓人', '可怕']
      }

      let detectedEmotions = [selectedEmotion]
      Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
        if (keywords.some(keyword => text.includes(keyword))) {
          if (!detectedEmotions.includes(emotion)) {
            detectedEmotions.push(emotion)
          }
        }
      })

      // 计算情绪强度
      let intensity = 5
      const textLength = text.length
      if (textLength > 50) intensity = 6
      if (textLength > 100) intensity = 7
      if (textLength > 200) intensity = 8
      if (textLength > 300) intensity = 9

      // 影响因素分析
      const influences = []
      if (text.includes('老板') || text.includes('领导') || text.includes('公司') || text.includes('工作')) {
        influences.push('工作压力')
      }
      if (text.includes('朋友') || text.includes('家人') || text.includes('伴侣')) {
        influences.push('人际关系')
      }
      if (text.includes('钱') || text.includes('薪资') || text.includes('经济')) {
        influences.push('经济因素')
      }
      if (text.includes('未来') || text.includes('以后') || text.includes('人生')) {
        influences.push('长期担忧')
      }

      return {
        primary: selectedEmotion,
        intensity: Math.min(10, intensity + Math.max(0, urgency - 5)),
        detected: detectedEmotions,
        influences: influences.length > 0 ? influences : ['未知压力源']
      }
    }

    // 根据情绪提供建议
    const getAdviceByEmotion = (emotion) => {
      const adviceMap = {
        焦虑: {
          immediate: [
            '进行4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒，重复4次',
            '站起来走动5分钟，或者做一些简单的伸展运动',
            '喝一杯温水，告诉自己："这种感觉会过去，我能处理好"',
            '写下你的担忧，然后划掉那些你无法控制的事情'
          ],
          rational: [
            '列出最坏情况的真实发生概率和应对方案',
            '把大问题分解成可执行的小步骤，每次只关注下一步',
            '设置"担忧时间"，每天固定15分钟专门思考这个问题',
            '考虑：这个决定能推迟吗？如果能，给自己设定明确的决定时间'
          ]
        },
        愤怒: {
          immediate: [
            '暂时离开现场，从1数到20再回来',
            '用冷水洗脸或手握冰袋，让身体冷静下来',
            '写下你的愤怒感受，然后撕掉那张纸',
            '快速运动3分钟（如原地跳跃、深蹲）释放能量'
          ],
          rational: [
            '问自己：这件事一年后还重要吗？',
            '区分事实和感受，只针对事实做决定',
            '考虑对方的立场和可能的误解',
            '先处理情绪，24小时后再做决定'
          ]
        },
        压力: {
          immediate: [
            '做3分钟的身体伸展，特别关注肩颈部位',
            '听一首轻音乐或大自然声音，闭上眼睛深呼吸',
            '进行一次快速的身体扫描：从脚到头感受每个部位',
            '喝一杯温热的洋甘菊茶或温水'
          ],
          rational: [
            '使用艾森豪威尔矩阵区分重要和紧急',
            '学会说"不"，优先处理最重要的任务',
            '分解任务，每次只专注一件事',
            '设置合理的期望值，接受"足够好"而不是完美'
          ]
        }
      }

      return adviceMap[emotion] || {
        immediate: [
          '暂停5分钟，做点完全不同的事情',
          '写下你的感受，这会帮你理清思路',
          '喝一杯温水，深呼吸3次',
          '短暂离开当前环境，看看窗外'
        ],
        rational: [
          '用SWOT分析法评估每个选项（优势、劣势、机会、威胁）',
          '考虑"如果朋友面临同样选择，你会怎么建议？"',
          '设置决策截止日期，避免过度思考',
          '权衡短期收益和长期影响'
        ]
      }
    }

    // 执行分析
    const emotionAnalysis = analyzeEmotion(situation, emotion)
    const advice = getAdviceByEmotion(emotion)

    // 构建响应
    const response = {
      emotionAnalysis,
      immediateAdvice: advice.immediate,
      rationalAdvice: advice.rational,
      cognitiveBiases: ['损失厌恶', '现状偏差', '确认偏差'],
      recommendedOption: options[0] ? `建议选择：${options[0]}，但给自己24小时的冷静期` : '暂时不做决定，先平复情绪',
      followUpQuestions: [
        '这个决定真的需要现在做吗？',
        '如果什么都不做，会发生什么？',
        '你内心最深处的声音是什么？',
        '你尊敬的人会怎么建议？'
      ],
      timestamp: new Date().toISOString(),
      note: '这些建议基于模拟数据分析，仅供参考。重要决定请咨询专业人士。'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('API Error:', error)

    // 返回模拟数据作为后备
    return NextResponse.json({
      emotionAnalysis: {
        primary: '焦虑',
        intensity: 7,
        detected: ['焦虑', '压力'],
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
      recommendedOption: '暂时不做决定，先平复情绪',
      followUpQuestions: [
        '这个决定真的需要现在做吗？',
        '如果什么都不做，会发生什么？',
        '你内心最深处的声音是什么？'
      ],
      note: '网络连接问题，使用模拟数据。建议稍后重试。'
    })
  }
}

// 添加 GET 方法用于测试
export async function GET() {
  return NextResponse.json({
    message: '决策分析API已就绪',
    status: '运行中',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
}