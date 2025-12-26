'use client'
import { useState, useEffect } from 'react'
import { Wind, Pause, Play, RotateCcw } from 'lucide-react'

export default function BreathingGuide() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState('inhale')
  const [count, setCount] = useState(4)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  const phases = {
    inhale: {
      duration: 4,
      text: '吸气...',
      next: 'hold',
      color: 'from-green-400 to-emerald-400',
      instruction: '通过鼻子缓慢吸气，感受腹部鼓起'
    },
    hold: {
      duration: 7,
      text: '屏息...',
      next: 'exhale',
      color: 'from-blue-400 to-cyan-400',
      instruction: '保持呼吸，让身体吸收氧气'
    },
    exhale: {
      duration: 8,
      text: '呼气...',
      next: 'inhale',
      color: 'from-purple-400 to-pink-400',
      instruction: '通过嘴巴缓慢呼气，感受压力释放'
    }
  }

  const currentPhase = phases[phase]

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          const nextPhase = currentPhase.next
          setPhase(nextPhase)
          if (nextPhase === 'inhale') {
            setCompletedCycles(prev => prev + 1)
          }
          return phases[nextPhase].duration
        }
        return prev - 1
      })

      setTotalTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase])

  const resetExercise = () => {
    setIsActive(false)
    setPhase('inhale')
    setCount(4)
    setCompletedCycles(0)
    setTotalTime(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-xl p-6 md:p-8 border border-emerald-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">呼吸放松练习</h3>
            <p className="text-gray-600">4-7-8呼吸法缓解焦虑</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={resetExercise}
            className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            title="重置练习"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`p-3 rounded-xl transition-all ${
              isActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="text-center mb-10">
        <div className={`relative w-64 h-64 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? 'animate-breathe' : ''} bg-gradient-to-r ${currentPhase.color}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold text-white mb-2">{count}</div>
              <div className="text-xl font-semibold text-white">{isActive ? currentPhase.text : '准备开始'}</div>
            </div>
          </div>
          <div className="absolute -inset-4 border-4 border-white/30 rounded-full animate-ping"></div>
        </div>

        <p className="text-lg text-gray-700 mb-6 max-w-md mx-auto">
          {isActive ? currentPhase.instruction : '点击开始按钮，按照引导进行呼吸练习'}
        </p>

        <div className="flex justify-center items-center space-x-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{completedCycles}</div>
            <div className="text-sm text-gray-600">完成循环</div>
          </div>
          <div className="h-12 w-px bg-emerald-200"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{formatTime(totalTime)}</div>
            <div className="text-sm text-gray-600">练习时间</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/80 p-5 rounded-xl border border-white text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">4</div>
          <div className="text-sm font-medium text-gray-700 mb-1">吸气</div>
          <div className="text-xs text-gray-500">秒</div>
        </div>
        <div className="bg-white/80 p-5 rounded-xl border border-white text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">7</div>
          <div className="text-sm font-medium text-gray-700 mb-1">屏息</div>
          <div className="text-xs text-gray-500">秒</div>
        </div>
        <div className="bg-white/80 p-5 rounded-xl border border-white text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
          <div className="text-sm font-medium text-gray-700 mb-1">呼气</div>
          <div className="text-xs text-gray-500">秒</div>
        </div>
      </div>

      <div className="bg-white/80 rounded-xl p-5 border border-white">
        <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
          <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
          练习指导
        </h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="w-2 h-2 bg-emerald-300 rounded-full mt-2 mr-3"></div>
            <span className="text-gray-700">每天练习3-5次，每次4个循环</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-emerald-300 rounded-full mt-2 mr-3"></div>
            <span className="text-gray-700">睡前练习有助于改善睡眠质量</span>
          </li>
          <li className="flex items-start">
            <div className="w-2 h-2 bg-emerald-300 rounded-full mt-2 mr-3"></div>
            <span className="text-gray-700">感到焦虑或压力时随时使用</span>
          </li>
        </ul>
      </div>
    </div>
  )
}