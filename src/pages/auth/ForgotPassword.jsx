import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone, Lock, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [tab, setTab] = useState('email')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-7">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">找回密码</h1>
          <p className="mt-1 text-sm text-gray-500">通过邮箱让以手机找回密码，我们将助您安全访问账户</p>
        </div>

        <div className="mb-5 inline-flex w-full rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setTab('email')}
            className={`tab flex-1 ${tab === 'email' ? 'tab-active' : ''}`}
          >
            邮箱找回
          </button>
          <button
            onClick={() => setTab('phone')}
            className={`tab flex-1 ${tab === 'phone' ? 'tab-active' : ''}`}
          >
            手机找回
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'email' ? (
            <Field icon={<Mail className="h-4 w-4" />} label="电子邮箱地址">
              <input className="input pl-10" placeholder="example@email.com" />
            </Field>
          ) : (
            <Field icon={<Phone className="h-4 w-4" />} label="手机号">
              <input className="input pl-10" placeholder="138 **** 8888" />
            </Field>
          )}

          <Field icon={<ShieldCheck className="h-4 w-4" />} label="验证码">
            <div className="flex gap-2">
              <input className="input pl-10" placeholder="6 位验证码" />
              <button type="button" className="btn-secondary whitespace-nowrap">
                获取验证码
              </button>
            </div>
          </Field>

          <Field icon={<Lock className="h-4 w-4" />} label="新密码">
            <input type="password" className="input pl-10" placeholder="请输入新密码" />
            <p className="mt-1 text-xs text-gray-400">
              密码必须包含至少 8 个字符，包含字母和数字
            </p>
          </Field>

          <Field icon={<Lock className="h-4 w-4" />} label="确认新密码">
            <input type="password" className="input pl-10" placeholder="请再次输入新密码" />
          </Field>

          <button type="submit" className="btn-primary mt-2 w-full py-2.5">
            重置我的密码
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> 返回登录页面
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        <Link to="#" className="hover:text-gray-600">帮助中心</Link>
        <span className="mx-2">·</span>
        <Link to="#" className="hover:text-gray-600">联系客服</Link>
        <span className="mx-2">·</span>
        <Link to="#" className="hover:text-gray-600">服务支持</Link>
      </div>
    </div>
  )
}

function Field({ icon, label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-[18px] -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
