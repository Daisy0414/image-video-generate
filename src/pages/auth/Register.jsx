import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone, Lock, User, ShieldCheck } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-7">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">创建您的账户</h1>
          <p className="mt-1 text-sm text-gray-500">加入我们的创作平台</p>
        </div>

        <div className="mb-5 flex items-center justify-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
          <ShieldCheck className="h-4 w-4" /> 使用真实信息以获得完整的服务体验
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field icon={<Mail className="h-4 w-4" />} label="电子邮箱">
            <input className="input pl-10" placeholder="name@example.com" />
          </Field>
          <Field icon={<Phone className="h-4 w-4" />} label="手机号">
            <input className="input pl-10" placeholder="138 **** 8888" />
          </Field>
          <Field icon={<ShieldCheck className="h-4 w-4" />} label="验证码">
            <div className="flex gap-2">
              <input className="input pl-10" placeholder="请输入验证码" />
              <button type="button" className="btn-secondary whitespace-nowrap">
                获取验证码
              </button>
            </div>
          </Field>
          <Field icon={<User className="h-4 w-4" />} label="登录账号">
            <input className="input pl-10" placeholder="设置登录账号" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="确认密码">
            <input type="password" className="input pl-10" placeholder="再次输入密码" />
          </Field>

          <button type="submit" className="btn-primary mt-2 w-full py-2.5">
            立即注册
          </button>
        </form>

        <p className="mt-5 text-center text-xs leading-relaxed text-gray-400">
          点击"立即注册"即表示您同意我们的{' '}
          <Link to="#" className="text-brand-600 hover:underline">服务协议</Link> 和{' '}
          <Link to="#" className="text-brand-600 hover:underline">隐私政策</Link>
        </p>

        <div className="mt-4 text-center text-sm text-gray-500">
          已经有账户了？{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            立即登录
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ icon, label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
