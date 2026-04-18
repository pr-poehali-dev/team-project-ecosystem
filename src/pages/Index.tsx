import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/06830a70-7693-446f-a001-00dadc3c5110/files/725dfd88-5e06-42f4-ad6f-5121b83291a9.jpg";
const DASHBOARD_IMG = "https://cdn.poehali.dev/projects/06830a70-7693-446f-a001-00dadc3c5110/files/510e993c-b094-41b5-880c-718fd9a665ab.jpg";

type Tab = "home" | "projects" | "payments" | "verification";

const PROJECTS = [
  {
    id: 1,
    name: "GreenTech Solutions",
    category: "ЭкоТех",
    status: "verified",
    raised: 12500000,
    goal: 20000000,
    investors: 87,
    roi: "24%",
    rating: 4.8,
    description: "Разработка ветровых турбин нового поколения для децентрализованной энергетики малых городов.",
    docs: 4,
  },
  {
    id: 2,
    name: "MedAI Diagnostics",
    category: "МедТех",
    status: "verified",
    raised: 8200000,
    goal: 15000000,
    investors: 54,
    roi: "31%",
    rating: 4.6,
    description: "ИИ-платформа ранней диагностики онкологических заболеваний по анализу крови.",
    docs: 6,
  },
  {
    id: 3,
    name: "AgriDrone Fleet",
    category: "АгроТех",
    status: "pending",
    raised: 3100000,
    goal: 10000000,
    investors: 21,
    roi: "18%",
    rating: 4.2,
    description: "Автономные дроны для точного земледелия и мониторинга полей в режиме реального времени.",
    docs: 3,
  },
  {
    id: 4,
    name: "UrbanMobility Hub",
    category: "Транспорт",
    status: "verified",
    raised: 18900000,
    goal: 25000000,
    investors: 132,
    roi: "27%",
    rating: 4.9,
    description: "Экосистема умной городской мобильности: каршеринг, самокаты и AI-маршрутизация.",
    docs: 8,
  },
];

const PAYMENTS = [
  { id: 1, project: "GreenTech Solutions", type: "Инвестиция", amount: 500000, date: "15.04.2026", status: "completed", txId: "TRX-00821" },
  { id: 2, project: "MedAI Diagnostics", type: "Инвестиция", amount: 250000, date: "12.04.2026", status: "completed", txId: "TRX-00798" },
  { id: 3, project: "UrbanMobility Hub", type: "Дивиденды", amount: 34200, date: "01.04.2026", status: "completed", txId: "TRX-00753" },
  { id: 4, project: "AgriDrone Fleet", type: "Инвестиция", amount: 150000, date: "28.03.2026", status: "pending", txId: "TRX-00741" },
  { id: 5, project: "GreenTech Solutions", type: "Дивиденды", amount: 18600, date: "01.03.2026", status: "completed", txId: "TRX-00699" },
];

const VERIFICATION_DOCS = [
  { id: 1, name: "Паспорт гражданина РФ", type: "identity", status: "verified", date: "10.03.2026" },
  { id: 2, name: "ИНН физического лица", type: "tax", status: "verified", date: "10.03.2026" },
  { id: 3, name: "Справка о доходах (2-НДФЛ)", type: "income", status: "pending", date: "14.04.2026" },
  { id: 4, name: "Банковские реквизиты", type: "bank", status: "rejected", date: "08.04.2026" },
];

function formatMoney(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} млн ₽`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} тыс ₽`;
  return `${n} ₽`;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    verified: { label: "✓ Верифицирован", cls: "status-verified" },
    pending: { label: "⏳ На проверке", cls: "status-pending" },
    rejected: { label: "✗ Отклонён", cls: "status-rejected" },
    completed: { label: "✓ Выполнен", cls: "status-verified" },
  };
  const s = map[status] || { label: status, cls: "status-pending" };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${s.cls}`}>{s.label}</span>
  );
}

function NavBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; icon: string; label: string }[] = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "projects", icon: "TrendingUp", label: "Проекты" },
    { id: "payments", icon: "CreditCard", label: "Платежи" },
    { id: "verification", icon: "ShieldCheck", label: "Верификация" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[#1e2a3a]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg btn-primary-neon flex items-center justify-center">
            <Icon name="Zap" size={16} />
          </div>
          <span className="font-['Oswald'] text-xl font-semibold gradient-text tracking-wider">PROJLINK</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                tab === item.id
                  ? "tab-active"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff8c] to-[#00d4ff] flex items-center justify-center text-black text-xs font-bold">АК</div>
            <div className="hidden md:block">
              <div className="text-xs text-white font-medium">Алексей К.</div>
              <div className="verified-badge">Верифицирован</div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex border-t border-[#1e2a3a]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex-1 flex flex-col items-center py-2 text-xs gap-1 transition-all ${
              tab === item.id ? "neon-text" : "text-gray-500"
            }`}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HomePage({ setTab }: { setTab: (t: Tab) => void }) {
  return (
    <div className="mesh-bg min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,255,140,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 pt-28 pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card border border-[#1e2a3a] text-sm text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#00ff8c] animate-pulse-slow" />
                Безопасная инвестиционная платформа
              </div>
              <h1 className="font-['Oswald'] text-6xl md:text-7xl font-bold leading-none mb-6">
                <span className="text-white">ВЛОЖИ</span>
                <br />
                <span className="gradient-text">УМНО.</span>
                <br />
                <span className="text-white">РАСТИ</span>
                <br />
                <span className="neon-blue-text">БЫСТРО.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                ProjLink — платформа верифицированных проектов с защитой каждой сделки.
                Только проверенные команды. Только реальные цифры.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setTab("projects")} className="btn-primary-neon px-8 py-3 rounded-xl font-semibold text-base">
                  Смотреть проекты
                </button>
                <button onClick={() => setTab("verification")} className="btn-neon px-8 py-3 rounded-xl font-semibold text-base">
                  Верифицироваться
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#1e2a3a]">
                {[
                  { val: "127", label: "Проектов" },
                  { val: "₽2.1 млрд", label: "Привлечено" },
                  { val: "4 800+", label: "Инвесторов" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-['Oswald'] text-3xl font-bold gradient-text">{s.val}</div>
                    <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-float hidden lg:block">
              <div className="absolute inset-0 rounded-2xl neon-border opacity-30" />
              <img src={HERO_IMG} alt="Platform" className="w-full rounded-2xl opacity-80" />
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 neon-border">
                <div className="text-xs text-gray-400 mb-1">Последняя инвестиция</div>
                <div className="text-[#00ff8c] font-['Oswald'] text-xl font-bold">+₽2 500 000</div>
                <div className="text-gray-400 text-xs">GreenTech Solutions · 2 мин назад</div>
              </div>
              <div className="absolute -top-4 -right-4 glass-card rounded-xl p-4 neon-border-blue">
                <div className="text-xs text-gray-400 mb-1">Верификация</div>
                <div className="flex items-center gap-2">
                  <Icon name="ShieldCheck" size={20} className="text-[#00d4ff]" />
                  <span className="text-[#00d4ff] font-semibold text-sm">100% безопасно</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-['Oswald'] text-4xl font-bold text-white mb-4">КАК ЭТО РАБОТАЕТ</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Три шага до первой безопасной инвестиции</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "01", icon: "UserCheck", title: "Верификация", desc: "Загружаете документы → проходите проверку → получаете статус верифицированного инвестора", color: "#00ff8c" },
            { step: "02", icon: "Search", title: "Выбор проекта", desc: "Изучаете верифицированные проекты с финансовой отчётностью и командой с документами", color: "#00d4ff" },
            { step: "03", icon: "Wallet", title: "Инвестиция", desc: "Делаете инвестицию через защищённую сделку. Все платежи прозрачны и отслеживаемы", color: "#a855f7" },
          ].map((f) => (
            <div key={f.step} className="glass-card rounded-2xl p-8 hover-card-glow border border-[#1e2a3a] animate-slide-up">
              <div className="flex items-start gap-4 mb-6">
                <span className="font-['Oswald'] text-5xl font-bold opacity-20 text-white">{f.step}</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mt-2"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                  <Icon name={f.icon} size={22} style={{ color: f.color }} />
                </div>
              </div>
              <h3 className="font-['Oswald'] text-2xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Projects Preview */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Oswald'] text-3xl font-bold text-white">ТОП ПРОЕКТЫ</h2>
          <button onClick={() => setTab("projects")} className="text-[#00ff8c] text-sm hover:underline flex items-center gap-1">
            Все проекты <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.slice(0, 2).map((p) => (
            <div key={p.id} className="glass-card rounded-2xl p-6 border border-[#1e2a3a] hover-card-glow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{p.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-['Oswald'] text-lg font-bold neon-text">{p.roi} ROI</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{formatMoney(p.raised)}</span>
                  <span>из {formatMoney(p.goal)}</span>
                </div>
                <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden">
                  <div className="h-full progress-neon rounded-full" style={{ width: `${(p.raised / p.goal) * 100}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{p.investors} инвесторов</span>
                <button onClick={() => setTab("projects")} className="btn-neon px-4 py-1.5 rounded-lg text-xs font-semibold">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", "ЭкоТех", "МедТех", "АгроТех", "Транспорт"];
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 mesh-bg min-h-screen">
      <div className="mb-8 animate-slide-up">
        <h2 className="font-['Oswald'] text-4xl font-bold text-white mb-2">ПРОЕКТЫ</h2>
        <p className="text-gray-400">Верифицированные инвестиционные возможности</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === cat ? "btn-primary-neon" : "glass-card border border-[#1e2a3a] text-gray-400 hover:text-white"
            }`}
          >
            {cat === "all" ? "Все" : cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-gray-500 text-sm">
          <Icon name="Shield" size={14} />
          <span>Только верифицированные проекты</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className={`glass-card rounded-2xl border hover-card-glow cursor-pointer transition-all ${
              selected === p.id ? "neon-border" : "border-[#1e2a3a]"
            } animate-slide-up stagger-${i + 1}`}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-['Oswald'] text-xl font-bold text-white">{p.name}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{p.category}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Icon name="FileText" size={10} /> {p.docs} докум.
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      ⭐ {p.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="font-['Oswald'] text-2xl font-bold neon-text">{p.roi}</div>
                  <div className="text-xs text-gray-500">прогн. ROI</div>
                </div>
              </div>

              {selected === p.id && (
                <p className="text-gray-400 text-sm leading-relaxed mb-4 border-t border-[#1e2a3a] pt-4">
                  {p.description}
                </p>
              )}

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-semibold">{formatMoney(p.raised)}</span>
                  <span className="text-gray-500">цель: {formatMoney(p.goal)}</span>
                </div>
                <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden">
                  <div className="h-full progress-neon rounded-full transition-all duration-500"
                    style={{ width: `${(p.raised / p.goal) * 100}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{((p.raised / p.goal) * 100).toFixed(0)}% от цели</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Icon name="Users" size={13} /> {p.investors} инвесторов
                  </span>
                </div>
                <button className="btn-primary-neon px-5 py-2 rounded-lg text-sm font-semibold"
                  onClick={(e) => e.stopPropagation()}>
                  Инвестировать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsPage() {
  const totalInvested = PAYMENTS.filter(p => p.type === "Инвестиция").reduce((s, p) => s + p.amount, 0);
  const totalDividends = PAYMENTS.filter(p => p.type === "Дивиденды").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 mesh-bg min-h-screen">
      <div className="mb-8 animate-slide-up">
        <h2 className="font-['Oswald'] text-4xl font-bold text-white mb-2">ПЛАТЕЖИ</h2>
        <p className="text-gray-400">История транзакций и финансовая аналитика</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Инвестировано", val: formatMoney(totalInvested), icon: "TrendingUp", color: "#00ff8c" },
          { label: "Дивиденды", val: formatMoney(totalDividends), icon: "Banknote", color: "#00d4ff" },
          { label: "Портфель", val: "4 проекта", icon: "Briefcase", color: "#a855f7" },
          { label: "Доходность", val: "+26.4%", icon: "BarChart3", color: "#f59e0b" },
        ].map((s, i) => (
          <div key={s.label} className={`glass-card rounded-2xl p-5 border border-[#1e2a3a] animate-slide-up stagger-${i + 1}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                <Icon name={s.icon} size={16} style={{ color: s.color }} />
              </div>
              <span className="text-gray-500 text-xs">{s.label}</span>
            </div>
            <div className="font-['Oswald'] text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Transaction Table */}
      <div className="glass-card rounded-2xl border border-[#1e2a3a] overflow-hidden">
        <div className="p-6 border-b border-[#1e2a3a] flex items-center justify-between">
          <h3 className="font-['Oswald'] text-xl font-bold text-white">История транзакций</h3>
          <button className="btn-neon px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Icon name="Download" size={14} /> Экспорт
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2a3a]">
                {["ID транзакции", "Проект", "Тип", "Сумма", "Дата", "Статус"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((tx, i) => (
                <tr key={tx.id} className={`border-b border-[#1e2a3a]/50 hover:bg-white/3 transition-all animate-slide-up stagger-${i + 1}`}>
                  <td className="px-6 py-4 text-xs font-mono text-[#00d4ff]">{tx.txId}</td>
                  <td className="px-6 py-4 text-sm text-white">{tx.project}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tx.type === "Дивиденды" ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30" : "bg-white/5 text-gray-400 border border-white/10"
                    }`}>{tx.type}</span>
                  </td>
                  <td className="px-6 py-4 font-['Oswald'] font-bold">
                    <span className={tx.type === "Дивиденды" ? "neon-text" : "text-white"}>
                      {tx.type === "Дивиденды" ? "+" : ""}{formatMoney(tx.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{tx.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="mt-6 glass-card rounded-2xl border border-[#1e2a3a] p-6">
        <h3 className="font-['Oswald'] text-xl font-bold text-white mb-6">Динамика портфеля</h3>
        <div className="flex items-end gap-3 h-32">
          {[35, 52, 48, 65, 72, 58, 80, 88, 76, 92, 85, 100].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm transition-all duration-500"
                style={{
                  height: `${v}%`,
                  background: `linear-gradient(180deg, #00ff8c ${100 - v}%, #00d4ff 100%)`,
                  opacity: 0.7 + (i / 24),
                  boxShadow: i === 11 ? "0 0 15px rgba(0,255,140,0.4)" : "none",
                }}
              />
              {i % 3 === 0 && (
                <span className="text-xs text-gray-600">{["Янв","Апр","Июл","Окт"][i / 3]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VerificationPage() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 mesh-bg min-h-screen">
      <div className="mb-8 animate-slide-up">
        <h2 className="font-['Oswald'] text-4xl font-bold text-white mb-2">ВЕРИФИКАЦИЯ</h2>
        <p className="text-gray-400">Подтвердите личность для полного доступа к платформе</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Status Column */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl border border-[#1e2a3a] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ff8c] to-[#00d4ff] flex items-center justify-center text-black text-xl font-bold">
                АК
              </div>
              <div>
                <div className="text-white font-semibold">Алексей Козлов</div>
                <StatusBadge status="verified" />
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Личность", done: true },
                { label: "Налоговый статус", done: true },
                { label: "Доход", done: false },
                { label: "Банк. реквизиты", done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <Icon name={item.done ? "CheckCircle" : "Clock"} size={16}
                    className={item.done ? "text-[#00ff8c]" : "text-yellow-500"} />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#1e2a3a]">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Прогресс верификации</span>
                <span>50%</span>
              </div>
              <div className="h-2 bg-[#1e2a3a] rounded-full overflow-hidden">
                <div className="h-full progress-neon rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-[#1e2a3a] p-6">
            <h3 className="font-['Oswald'] text-lg font-bold text-white mb-4">Уровни доступа</h3>
            {[
              { level: "Базовый", limit: "до ₽100K", active: true, color: "#00ff8c" },
              { level: "Стандарт", limit: "до ₽1 млн", active: false, color: "#00d4ff" },
              { level: "Профи", limit: "без лимита", active: false, color: "#a855f7" },
            ].map((l) => (
              <div key={l.level} className={`flex items-center justify-between p-3 rounded-xl mb-2 ${
                l.active ? "border" : "opacity-50"
              }`} style={l.active ? { borderColor: `${l.color}40`, background: `${l.color}10` } : {}}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-sm text-white">{l.level}</span>
                </div>
                <span className="text-xs" style={{ color: l.color }}>{l.limit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl border border-[#1e2a3a] overflow-hidden">
            <div className="p-6 border-b border-[#1e2a3a]">
              <h3 className="font-['Oswald'] text-xl font-bold text-white">Загруженные документы</h3>
            </div>
            <div className="divide-y divide-[#1e2a3a]">
              {VERIFICATION_DOCS.map((doc, i) => (
                <div key={doc.id} className={`flex items-center justify-between p-5 hover:bg-white/3 animate-slide-up stagger-${i + 1}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      doc.status === "verified" ? "bg-[#00ff8c]/10 border border-[#00ff8c]/30" :
                      doc.status === "rejected" ? "bg-red-500/10 border border-red-500/30" :
                      "bg-yellow-500/10 border border-yellow-500/30"
                    }`}>
                      <Icon name="FileText" size={18} className={
                        doc.status === "verified" ? "text-[#00ff8c]" :
                        doc.status === "rejected" ? "text-red-500" : "text-yellow-500"
                      } />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{doc.name}</div>
                      <div className="text-xs text-gray-500">Загружен: {doc.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={doc.status} />
                    {doc.status === "rejected" && (
                      <button className="btn-neon px-3 py-1.5 rounded-lg text-xs">Загрузить снова</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload */}
          <div
            className={`glass-card rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
              dragOver ? "border-[#00ff8c] bg-[#00ff8c]/5" : "border-[#1e2a3a] hover:border-[#00ff8c]/40"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={() => setDragOver(false)}
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(0,255,140,0.1)", border: "1px solid rgba(0,255,140,0.3)" }}>
              <Icon name="Upload" size={28} className="text-[#00ff8c]" />
            </div>
            <h3 className="font-['Oswald'] text-xl font-bold text-white mb-2">Загрузить документ</h3>
            <p className="text-gray-500 text-sm mb-6">
              Перетащите файл сюда или нажмите для выбора<br />
              <span className="text-xs">PDF, JPG, PNG — до 10 МБ</span>
            </p>
            <button className="btn-primary-neon px-8 py-3 rounded-xl font-semibold">
              Выбрать файл
            </button>
          </div>

          {/* Requirements */}
          <div className="glass-card rounded-2xl border border-[#1e2a3a] p-6">
            <h3 className="font-['Oswald'] text-lg font-bold text-white mb-4">Требования к документам</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: "CheckCircle", text: "Чёткое изображение, все данные читаемы", ok: true },
                { icon: "CheckCircle", text: "Документ действителен (не просрочен)", ok: true },
                { icon: "XCircle", text: "Фотографии с телефона без вспышки", ok: false },
                { icon: "XCircle", text: "Отсканированные копии с артефактами", ok: false },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Icon name={r.icon} size={15} className={r.ok ? "text-[#00ff8c] mt-0.5" : "text-red-500 mt-0.5"} />
                  <span className={r.ok ? "text-gray-300" : "text-gray-500"}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen bg-[#0a0e14]">
      <NavBar tab={tab} setTab={setTab} />
      {tab === "home" && <HomePage setTab={setTab} />}
      {tab === "projects" && <ProjectsPage />}
      {tab === "payments" && <PaymentsPage />}
      {tab === "verification" && <VerificationPage />}
    </div>
  );
}
