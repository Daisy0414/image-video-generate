import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Phone, ArrowRight, MessageCircle, Music2 } from 'lucide-react'

export default function Login() {
  const [tab, setTab] = useState('email')
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-7">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">欢迎回来</h1>
          <p className="mt-1 text-sm text-gray-500">登录以继续您的创作旅程</p>
        </div>

        <div className="mb-5 inline-flex w-full rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setTab('email')}
            className={`tab flex-1 ${tab === 'email' ? 'tab-active' : ''}`}
          >
            邮箱登录
          </button>
          <button
            onClick={() => setTab('phone')}
            className={`tab flex-1 ${tab === 'phone' ? 'tab-active' : ''}`}
          >
            手机登录
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'email' ? (
            <>
              <Field icon={<Mail className="h-4 w-4" />} label="电子邮箱">
                <input className="input pl-10" placeholder="name@example.com" />
              </Field>
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="密码"
                right={
                  <Link to="/forgot-password" className="text-xs text-brand-600 hover:underline">
                    忘记密码？
                  </Link>
                }
              >
                <input type="password" className="input pl-10" placeholder="请输入密码" />
              </Field>
            </>
          ) : (
            <>
              <Field icon={<Phone className="h-4 w-4" />} label="手机号">
                <input className="input pl-10" placeholder="138 **** 8888" />
              </Field>
              <Field icon={<Lock className="h-4 w-4" />} label="验证码">
                <div className="flex gap-2">
                  <input className="input pl-10" placeholder="请输入验证码" />
                  <button type="button" className="btn-secondary whitespace-nowrap">
                    获取验证码
                  </button>
                </div>
              </Field>
            </>
          )}

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            30 天免登录
          </label>

          <button type="submit" className="btn-primary w-full py-2.5">
            登录 <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-100" />
          或使用以下方式登录
          <span className="h-px flex-1 bg-gray-100" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="btn-secondary">
            <MessageCircle className="h-4 w-4 text-emerald-500" /> 微信
          </button>
          <button className="btn-secondary">
            <Music2 className="h-4 w-4 text-rose-500" /> 抖音
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          还没有账号？{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:underline">
            立即注册
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ icon, label, right, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {right}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
