import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/06830a70-7693-446f-a001-00dadc3c5110/files/725dfd88-5e06-42f4-ad6f-5121b83291a9.jpg";
const DASHBOARD_IMG = "https://cdn.poehali.dev/projects/06830a70-7693-446f-a001-00dadc3c5110/files/510e993c-b094-41b5-880c-718fd9a665ab.jpg";

type Tab = "home" | "projects" | "tasks" | "reports" | "payments" | "verification";

const REPORTS = [
  {
    id: 1,
    project: "GreenTech Solutions",
    category: "ЭкоТех",
    period: "Q1 2026",
    date: "01.04.2026",
    type: "Квартальный",
    revenue: 4200000,
    expenses: 2800000,
    profit: 1400000,
    growth: 18,
    status: "published",
    summary: "Выручка выросла на 18% по сравнению с Q4 2025. Запущен новый объект в Краснодарском крае. Привлечено 3 новых корпоративных клиента.",
    docs: [
      { name: "Финансовый отчёт Q1 2026.pdf", size: "2.4 МБ" },
      { name: "Аудиторское заключение.pdf", size: "1.1 МБ" },
      { name: "Презентация для инвесторов.pdf", size: "5.7 МБ" },
    ],
  },
  {
    id: 2,
    project: "MedAI Diagnostics",
    category: "МедТех",
    period: "Q1 2026",
    date: "05.04.2026",
    type: "Квартальный",
    revenue: 2100000,
    expenses: 1900000,
    profit: 200000,
    growth: 31,
    status: "published",
    summary: "Пользовательская база выросла на 31%. Подписан контракт с сетью клиник «МедПлюс» на 1 200 тест-систем в месяц. FDA-заявка подана.",
    docs: [
      { name: "Финансовый отчёт Q1 2026.pdf", size: "1.9 МБ" },
      { name: "Клинические результаты.pdf", size: "3.2 МБ" },
    ],
  },
  {
    id: 3,
    project: "UrbanMobility Hub",
    category: "Транспорт",
    period: "Q1 2026",
    date: "02.04.2026",
    type: "Квартальный",
    revenue: 8900000,
    expenses: 5100000,
    profit: 3800000,
    growth: 27,
    status: "published",
    summary: "Парк расширен до 4 200 самокатов и 800 автомобилей в 6 городах. NPS достиг 71. Готовимся к выходу в Казань и Нижний Новгород.",
    docs: [
      { name: "Финансовый отчёт Q1 2026.pdf", size: "2.8 МБ" },
      { name: "Операционные метрики.pdf", size: "1.5 МБ" },
      { name: "Стратегия расширения.pdf", size: "4.1 МБ" },
    ],
  },
  {
    id: 4,
    project: "AgriDrone Fleet",
    category: "АгроТех",
    period: "Q1 2026",
    date: "10.04.2026",
    type: "Квартальный",
    revenue: 900000,
    expenses: 1400000,
    profit: -500000,
    growth: 8,
    status: "pending",
    summary: "Период активных инвестиций в R&D. Завершили разработку дрона 3-го поколения. Пилот с АО «АгроХолдинг» стартует в мае 2026.",
    docs: [
      { name: "Финансовый отчёт Q1 2026.pdf", size: "1.3 МБ" },
    ],
  },
  {
    id: 5,
    project: "GreenTech Solutions",
    category: "ЭкоТех",
    period: "2025 (годовой)",
    date: "15.02.2026",
    type: "Годовой",
    revenue: 14800000,
    expenses: 9600000,
    profit: 5200000,
    growth: 42,
    status: "published",
    summary: "Рекордный год: выручка +42%, открыты 5 новых объектов. Независимый аудит подтвердил чистоту финансовой отчётности.",
    docs: [
      { name: "Годовой отчёт 2025.pdf", size: "8.2 МБ" },
      { name: "Аудиторское заключение 2025.pdf", size: "2.1 МБ" },
      { name: "ESG-отчёт 2025.pdf", size: "3.9 МБ" },
    ],
  },
];

const TASKS = [
  {
    id: 1,
    project: "GreenTech Solutions",
    category: "ЭкоТех",
    title: "Разработать landing page для кампании по привлечению инвесторов",
    type: "Дизайн / Разработка",
    reward: 45000,
    deadline: "30.04.2026",
    difficulty: "middle",
    tags: ["React", "Figma", "UI/UX"],
    applicants: 12,
    status: "open",
  },
  {
    id: 2,
    project: "MedAI Diagnostics",
    category: "МедТех",
    title: "Написать экспертный обзор ML-модели для медицинской диагностики",
    type: "Аналитика",
    reward: 28000,
    deadline: "25.04.2026",
    difficulty: "senior",
    tags: ["Machine Learning", "Медицина", "Аналитика"],
    applicants: 5,
    status: "open",
  },
  {
    id: 3,
    project: "AgriDrone Fleet",
    category: "АгроТех",
    title: "Настроить таргетированную рекламу в VK и Telegram",
    type: "Маркетинг",
    reward: 18000,
    deadline: "22.04.2026",
    difficulty: "junior",
    tags: ["SMM", "Таргет", "VK Ads"],
    applicants: 23,
    status: "open",
  },
  {
    id: 4,
    project: "UrbanMobility Hub",
    category: "Транспорт",
    title: "Юридическая экспертиза договора с партнёром-перевозчиком",
    type: "Юриспруденция",
    reward: 60000,
    deadline: "28.04.2026",
    difficulty: "senior",
    tags: ["Право", "B2B", "Договоры"],
    applicants: 3,
    status: "open",
  },
  {
    id: 5,
    project: "GreenTech Solutions",
    category: "ЭкоТех",
    title: "Перевести питч-дек на английский язык для международных инвесторов",
    type: "Переводы",
    reward: 12000,
    deadline: "20.04.2026",
    difficulty: "junior",
    tags: ["Английский", "Pitch Deck", "Финансы"],
    applicants: 8,
    status: "in_progress",
  },
  {
    id: 6,
    project: "MedAI Diagnostics",
    category: "МедТех",
    title: "Провести 10 глубинных интервью с потенциальными пользователями",
    type: "Исследования",
    reward: 35000,
    deadline: "05.05.2026",
    difficulty: "middle",
    tags: ["CustDev", "UX Research", "Медицина"],
    applicants: 7,
    status: "open",
  },
];

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
    { id: "tasks", icon: "ListTodo", label: "Задачи" },
    { id: "reports", icon: "BarChart2", label: "Отчёты" },
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
          <span className="font-['Oswald'] text-xl font-semibold gradient-text tracking-wider">STARTUPBOOST</span>
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
                <span className="text-white">ВКЛАДЫВАЙ</span>
                <br />
                <span className="gradient-text">УМНО.</span>
                <br />
                <span className="text-white">СОЗДАВАЙ</span>
                <br />
                <span className="neon-blue-text">БЫСТРО.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                StartupBoost — поддерживай реальные проекты выполнением задач и инвестициями, и зарабатывай деньги.
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

const EXPERT_ROLES = [
  { id: "mentor", icon: "GraduationCap", label: "Ментор", desc: "Наставничество и стратегические советы команде", color: "#00ff8c" },
  { id: "consultant", icon: "Lightbulb", label: "Консультант", desc: "Экспертиза в конкретной области по запросу", color: "#00d4ff" },
  { id: "partner", icon: "Handshake", label: "Партнёр", desc: "Вхождение в проект с долей и активным участием", color: "#a855f7" },
  { id: "advisor", icon: "Star", label: "Советник", desc: "Участие в Совете директоров или наблюдательном совете", color: "#f59e0b" },
];

type ApplicationState = "form" | "success";

function JoinModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  const [role, setRole] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [appState, setAppState] = useState<ApplicationState>("form");
  const [form, setForm] = useState({ name: "", expertise: "", message: "", linkedin: "" });

  const selectedRole = EXPERT_ROLES.find(r => r.id === role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppState("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative glass-card rounded-2xl border border-[#1e2a3a] w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {appState === "success" ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: "rgba(0,255,140,0.15)", border: "2px solid rgba(0,255,140,0.5)" }}>
              <Icon name="CheckCircle" size={40} className="text-[#00ff8c]" />
            </div>
            <h3 className="font-['Oswald'] text-3xl font-bold text-white mb-3">ЗАЯВКА ОТПРАВЛЕНА</h3>
            <p className="text-gray-400 mb-2">Роль: <span className="text-[#00ff8c] font-semibold">{selectedRole?.label}</span></p>
            <p className="text-gray-400 mb-6">Команда <span className="text-white font-semibold">{project.name}</span> рассмотрит вашу заявку в течение 3 рабочих дней.</p>
            <div className="glass-card rounded-xl border border-[#1e2a3a] p-4 mb-6 text-left">
              <div className="text-xs text-gray-500 mb-2">Что дальше</div>
              {["Команда изучит ваш профиль и сообщение", "Если подходите — пригласят на видеозвонок", "Подпись соглашения и вступление в проект"].map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-400 mb-2">
                  <span className="neon-text font-bold">{i + 1}.</span> {s}
                </div>
              ))}
            </div>
            <button onClick={onClose} className="btn-primary-neon px-8 py-3 rounded-xl font-semibold w-full">Закрыть</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-[#1e2a3a]">
              <div>
                <h3 className="font-['Oswald'] text-xl font-bold text-white">ВСТУПИТЬ В СТАРТАП</h3>
                <p className="text-gray-500 text-sm">{project.name}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg glass-card border border-[#1e2a3a] flex items-center justify-center text-gray-400 hover:text-white">
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 px-6 pt-5">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s ? "btn-primary-neon" : "glass-card border border-[#1e2a3a] text-gray-500"
                  }`}>{s}</div>
                  {s < 2 && <div className={`h-px w-16 transition-all ${step > s ? "bg-[#00ff8c]" : "bg-[#1e2a3a]"}`} />}
                </div>
              ))}
              <span className="ml-2 text-xs text-gray-500">{step === 1 ? "Выбор роли" : "Данные заявки"}</span>
            </div>

            {step === 1 && (
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-5">Выберите роль, в которой хотите участвовать в проекте:</p>
                <div className="space-y-3">
                  {EXPERT_ROLES.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        role === r.id
                          ? "border-[#00ff8c] bg-[#00ff8c]/8"
                          : "border-[#1e2a3a] glass-card hover:border-[#1e2a3a]/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${r.color}18`, border: `1px solid ${r.color}40` }}>
                          <Icon name={r.icon} size={18} style={{ color: r.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-sm">{r.label}</span>
                            {role === r.id && <Icon name="CheckCircle" size={14} className="text-[#00ff8c]" />}
                          </div>
                          <p className="text-gray-500 text-xs mt-0.5">{r.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  disabled={!role}
                  onClick={() => setStep(2)}
                  className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                    role ? "btn-primary-neon" : "bg-[#1e2a3a] text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Продолжить →
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center gap-3 mb-5 p-3 rounded-xl glass-card border border-[#1e2a3a]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${selectedRole?.color}18`, border: `1px solid ${selectedRole?.color}40` }}>
                    <Icon name={selectedRole?.icon || "Star"} size={16} style={{ color: selectedRole?.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Выбранная роль</div>
                    <div className="text-white text-sm font-semibold">{selectedRole?.label}</div>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs text-[#00d4ff] hover:underline">Изменить</button>
                </div>
                <div className="space-y-4">
                  {[
                    { key: "name", label: "Имя и фамилия", placeholder: "Иван Петров", type: "text" },
                    { key: "expertise", label: "Область экспертизы", placeholder: "Например: ML-инженер, 10 лет опыта", type: "text" },
                    { key: "linkedin", label: "LinkedIn / сайт (опционально)", placeholder: "linkedin.com/in/...", type: "text" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-gray-400 mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full bg-[#0a0e14] border border-[#1e2a3a] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff8c] transition-all"
                        required={f.key !== "linkedin"}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Сопроводительное сообщение</label>
                    <textarea
                      placeholder="Расскажите, какую ценность принесёте проекту и почему хотите присоединиться..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                      className="w-full bg-[#0a0e14] border border-[#1e2a3a] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff8c] transition-all resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl text-sm text-gray-400 glass-card border border-[#1e2a3a] hover:text-white">
                    ← Назад
                  </button>
                  <button type="submit" className="flex-1 btn-primary-neon py-3 rounded-xl font-semibold text-sm">
                    Отправить заявку
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [joinProject, setJoinProject] = useState<typeof PROJECTS[0] | null>(null);

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

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Icon name="Users" size={13} /> {p.investors} инвесторов
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn-neon px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    onClick={(e) => { e.stopPropagation(); setJoinProject(p); }}
                  >
                    <Icon name="UserPlus" size={13} /> Вступить как эксперт
                  </button>
                  <button className="btn-primary-neon px-5 py-2 rounded-lg text-sm font-semibold"
                    onClick={(e) => e.stopPropagation()}>
                    Инвестировать
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {joinProject && <JoinModal project={joinProject} onClose={() => setJoinProject(null)} />}
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

const DIFFICULTY_MAP: Record<string, { label: string; color: string }> = {
  junior: { label: "Junior", color: "#00ff8c" },
  middle: { label: "Middle", color: "#00d4ff" },
  senior: { label: "Senior", color: "#a855f7" },
};

function TaskApplyModal({ task, onClose }: { task: typeof TASKS[0]; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", about: "", portfolio: "" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative glass-card rounded-2xl border border-[#1e2a3a] w-full max-w-md animate-slide-up" onClick={e => e.stopPropagation()}>
        {sent ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: "rgba(0,255,140,0.12)", border: "2px solid rgba(0,255,140,0.4)" }}>
              <Icon name="CheckCircle" size={40} className="text-[#00ff8c]" />
            </div>
            <h3 className="font-['Oswald'] text-2xl font-bold text-white mb-3">ОТКЛИК ОТПРАВЛЕН!</h3>
            <p className="text-gray-400 text-sm mb-2">Задача: <span className="text-white">{task.title}</span></p>
            <p className="text-gray-400 text-sm mb-6">Команда <span className="text-[#00ff8c]">{task.project}</span> свяжется с вами в течение 48 часов.</p>
            <button onClick={onClose} className="btn-primary-neon w-full py-3 rounded-xl font-semibold">Закрыть</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-[#1e2a3a]">
              <div>
                <h3 className="font-['Oswald'] text-xl font-bold text-white">ОТКЛИКНУТЬСЯ</h3>
                <p className="text-gray-500 text-xs mt-0.5">{task.project} · {formatMoney(task.reward)}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg glass-card border border-[#1e2a3a] flex items-center justify-center text-gray-400 hover:text-white">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="p-5 border-b border-[#1e2a3a] bg-[#00ff8c]/4">
              <p className="text-white text-sm font-medium leading-snug">{task.title}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {task.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-[#1e2a3a]">{t}</span>
                ))}
              </div>
            </div>
            <form className="p-6 space-y-4" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              {[
                { key: "name", label: "Имя и фамилия", placeholder: "Иван Петров" },
                { key: "portfolio", label: "Ссылка на портфолио / GitHub (опционально)", placeholder: "github.com/..." },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-gray-400 mb-1.5">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    required={f.key === "name"}
                    className="w-full bg-[#0a0e14] border border-[#1e2a3a] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff8c] transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Почему вы подходите для этой задачи?</label>
                <textarea
                  placeholder="Опишите ваш опыт и как вы планируете выполнить задачу..."
                  rows={4}
                  required
                  value={form.about}
                  onChange={e => setForm(p => ({ ...p, about: e.target.value }))}
                  className="w-full bg-[#0a0e14] border border-[#1e2a3a] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff8c] transition-all resize-none"
                />
              </div>
              <button type="submit" className="btn-primary-neon w-full py-3 rounded-xl font-semibold text-sm">
                Отправить отклик
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function TasksPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [applyTask, setApplyTask] = useState<typeof TASKS[0] | null>(null);

  const types = ["all", "Дизайн / Разработка", "Маркетинг", "Аналитика", "Юриспруденция", "Исследования", "Переводы"];
  const filtered = typeFilter === "all" ? TASKS : TASKS.filter(t => t.type === typeFilter);

  const totalReward = TASKS.filter(t => t.status === "open").reduce((s, t) => s + t.reward, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 mesh-bg min-h-screen">
      <div className="mb-8 animate-slide-up">
        <h2 className="font-['Oswald'] text-4xl font-bold text-white mb-2">ЗАДАЧИ</h2>
        <p className="text-gray-400">Выполняй задания стартапов и получай вознаграждение</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Открытых задач", val: TASKS.filter(t => t.status === "open").length.toString(), icon: "ListTodo", color: "#00ff8c" },
          { label: "Доступный заработок", val: formatMoney(totalReward), icon: "Wallet", color: "#00d4ff" },
          { label: "Стартапов-заказчиков", val: "4", icon: "Briefcase", color: "#a855f7" },
          { label: "Средний чек", val: formatMoney(Math.round(totalReward / TASKS.filter(t => t.status === "open").length)), icon: "TrendingUp", color: "#f59e0b" },
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              typeFilter === t ? "btn-primary-neon" : "glass-card border border-[#1e2a3a] text-gray-400 hover:text-white"
            }`}
          >
            {t === "all" ? "Все типы" : t}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="grid lg:grid-cols-2 gap-5">
        {filtered.map((task, i) => {
          const diff = DIFFICULTY_MAP[task.difficulty];
          return (
            <div key={task.id} className={`glass-card rounded-2xl border border-[#1e2a3a] hover-card-glow animate-slide-up stagger-${i + 1} transition-all`}>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-[#1e2a3a]">{task.type}</span>
                      <span className="text-xs px-2 py-1 rounded-full font-semibold"
                        style={{ background: `${diff.color}15`, border: `1px solid ${diff.color}40`, color: diff.color }}>
                        {diff.label}
                      </span>
                      {task.status === "in_progress" && (
                        <span className="status-pending text-xs px-2 py-1 rounded-full">В работе</span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-sm leading-snug">{task.title}</h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-['Oswald'] text-xl font-bold neon-text">{formatMoney(task.reward)}</div>
                    <div className="text-xs text-gray-500">вознаграждение</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {task.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-[#1e2a3a] text-gray-400">{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1e2a3a]">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Icon name="Building2" size={12} /> {task.project}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} /> до {task.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size={12} /> {task.applicants} откликов
                    </span>
                  </div>
                  <button
                    disabled={task.status === "in_progress"}
                    onClick={() => setApplyTask(task)}
                    className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      task.status === "in_progress"
                        ? "bg-[#1e2a3a] text-gray-600 cursor-not-allowed"
                        : "btn-primary-neon"
                    }`}
                  >
                    {task.status === "in_progress" ? "Занята" : "Откликнуться"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {applyTask && <TaskApplyModal task={applyTask} onClose={() => setApplyTask(null)} />}
    </div>
  );
}

function ReportsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const types = ["all", "Квартальный", "Годовой"];
  const filtered = filter === "all" ? REPORTS : REPORTS.filter(r => r.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 mesh-bg min-h-screen">
      <div className="mb-8 animate-slide-up">
        <h2 className="font-['Oswald'] text-4xl font-bold text-white mb-2">ОТЧЁТЫ КОМПАНИЙ</h2>
        <p className="text-gray-400">Финансовая отчётность и ключевые показатели стартапов</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Отчётов опубликовано", val: REPORTS.filter(r => r.status === "published").length.toString(), icon: "FileText", color: "#00ff8c" },
          { label: "Компаний отчитались", val: "4", icon: "Building2", color: "#00d4ff" },
          { label: "Суммарная выручка", val: "₽31 млн", icon: "TrendingUp", color: "#a855f7" },
          { label: "Средний рост", val: "+25.5%", icon: "BarChart3", color: "#f59e0b" },
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

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === t ? "btn-primary-neon" : "glass-card border border-[#1e2a3a] text-gray-400 hover:text-white"
            }`}
          >
            {t === "all" ? "Все периоды" : t}
          </button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {filtered.map((r, i) => (
          <div
            key={r.id}
            className={`glass-card rounded-2xl border transition-all hover-card-glow cursor-pointer animate-slide-up stagger-${i + 1} ${
              selected === r.id ? "neon-border" : "border-[#1e2a3a]"
            }`}
            onClick={() => setSelected(selected === r.id ? null : r.id)}
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>
                    <Icon name="FileBarChart" size={22} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-['Oswald'] text-lg font-bold text-white">{r.project}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-[#1e2a3a]">{r.category}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-[#1e2a3a]">{r.type}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="text-gray-500 text-sm">Период: {r.period} · Опубликован: {r.date}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex gap-6 md:gap-8 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Выручка</div>
                    <div className="font-['Oswald'] text-lg font-bold text-white">{formatMoney(r.revenue)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Прибыль</div>
                    <div className={`font-['Oswald'] text-lg font-bold ${r.profit >= 0 ? "neon-text" : "text-red-400"}`}>
                      {r.profit >= 0 ? "+" : ""}{formatMoney(r.profit)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Рост</div>
                    <div className="font-['Oswald'] text-lg font-bold text-[#00d4ff]">+{r.growth}%</div>
                  </div>
                  <div className="flex items-center">
                    <Icon name={selected === r.id ? "ChevronUp" : "ChevronDown"} size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {selected === r.id && (
                <div className="mt-6 pt-6 border-t border-[#1e2a3a] grid md:grid-cols-2 gap-6 animate-slide-up">
                  <div>
                    <h4 className="font-['Oswald'] text-base font-bold text-white mb-3">Краткое резюме</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{r.summary}</p>

                    {/* Mini chart */}
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-2">Структура затрат и выручки</div>
                      <div className="space-y-2">
                        {[
                          { label: "Выручка", val: r.revenue, max: r.revenue, color: "#00ff8c" },
                          { label: "Расходы", val: r.expenses, max: r.revenue, color: "#f59e0b" },
                          { label: "Прибыль", val: Math.max(r.profit, 0), max: r.revenue, color: "#00d4ff" },
                        ].map(m => (
                          <div key={m.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">{m.label}</span>
                              <span style={{ color: m.color }}>{formatMoney(m.val)}</span>
                            </div>
                            <div className="h-1.5 bg-[#1e2a3a] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${Math.round((m.val / m.max) * 100)}%`, background: m.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-['Oswald'] text-base font-bold text-white mb-3">Документы</h4>
                    <div className="space-y-2">
                      {r.docs.map((doc, di) => (
                        <div key={di} className="flex items-center justify-between p-3 rounded-xl glass-card border border-[#1e2a3a] hover:border-[#00d4ff]/40 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>
                              <Icon name="FileText" size={14} className="text-[#00d4ff]" />
                            </div>
                            <div>
                              <div className="text-white text-xs font-medium">{doc.name}</div>
                              <div className="text-gray-600 text-xs">{doc.size}</div>
                            </div>
                          </div>
                          <button className="btn-neon px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                            onClick={e => e.stopPropagation()}>
                            <Icon name="Download" size={12} /> Скачать
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
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
      {tab === "tasks" && <TasksPage />}
      {tab === "reports" && <ReportsPage />}
      {tab === "payments" && <PaymentsPage />}
      {tab === "verification" && <VerificationPage />}
    </div>
  );
}