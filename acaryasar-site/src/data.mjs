// Sitedeki tüm içerik bu dosyadan yönetilir.
// Metinleri, teknolojileri ve ürünleri burada güncelleyip `npm run build` çalıştırmanız yeterli.

export const site = {
  url: 'https://www.acaryasar.com',
  name: 'Acar Yaşar',
  title: 'Yazılım Geliştirici & Ürün Kurucusu',
  description:
    'Acar Yaşar — işletmelerin günlük işini kolaylaştıran web tabanlı SaaS ürünleri geliştiren yazılım geliştirici. iyiSınıf, iyiSite, iyiAvukat, iyiCRM, iyiBerber ve iyiDernek.',
  intro:
    'Okullardan hukuk bürolarına, berberlerden derneklere kadar farklı sektörler için sade, hızlı ve mobil uyumlu yazılımlar geliştiriyorum. Fikirden canlı ürüne kadar uçtan uca çalışıyorum.',
  about: [
    'Kurumsal yazılım geliştirme tecrübemi, küçük ve orta ölçekli işletmelerin gerçek ihtiyaçlarına odaklanan ürünlere dönüştürüyorum. “iyi” ürün ailesi, her sektörün tekrar eden iş yükünü tek bir panelde toplamak için doğdu.',
    'Backend tarafında .NET ve C#, arayüz tarafında React ve TypeScript ile çalışıyor; bulut, veritabanı ve yapay zekâ entegrasyonlarıyla ürünleri uçtan uca hayata geçiriyorum.',
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/acaryasar/?locale=tr-TR',
    github: 'https://github.com/acaryasar',
    // İsterseniz iletişim e-postanızı buraya ekleyin; boş bırakılırsa gösterilmez.
    email: '',
  },
  stats: [
    { value: '6', label: 'SaaS ürünü' },
    { value: '%100', label: 'Mobil uyumlu' },
    { value: 'Uçtan uca', label: 'Tasarım → Yayın' },
  ],
  tech: [
    { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'Three.js'] },
    { group: 'Backend', items: ['C#', '.NET / ASP.NET Core', 'REST API', 'Entity Framework', 'Node.js'] },
    { group: 'Veri & Bulut', items: ['SQL Server', 'PostgreSQL', 'Supabase', 'Render', 'Git & GitHub'] },
    { group: 'Yapay Zekâ', items: ['LLM entegrasyonları', 'Doküman analizi', 'Akıllı asistanlar'] },
  ],
};

// `slug`, www.acaryasar.com/<slug> adresini belirler.
// Demo butonu https://<slug küçük harf>.acaryasar.com adresine yönlendirir.
export const products = [
  {
    slug: 'iyiSinif',
    name: 'iyiSınıf',
    icon: 'school',
    color: '#6366f1',
    tagline: 'Okul ve kurslar için sınıf yönetimi',
    summary: 'Öğrenci, öğretmen ve veli iletişimini; yoklama, ödev ve not takibini tek panelde toplayın.',
    audience: 'Okullar, dershaneler, kurs merkezleri ve özel öğretmenler',
    features: [
      { icon: 'users', title: 'Öğrenci & Sınıf Yönetimi', text: 'Sınıfları, şubeleri ve öğrenci kayıtlarını dakikalar içinde oluşturun.' },
      { icon: 'check', title: 'Dijital Yoklama', text: 'Tek dokunuşla yoklama alın, devamsızlıkları otomatik raporlayın.' },
      { icon: 'book', title: 'Ödev & Not Takibi', text: 'Ödev verin, teslimleri izleyin, sınav notlarını karne gibi görüntüleyin.' },
      { icon: 'message', title: 'Veli Bilgilendirme', text: 'Duyuru ve bildirimlerle velilerle anlık iletişim kurun.' },
      { icon: 'calendar', title: 'Ders Programı', text: 'Haftalık ders programlarını ve etkinlik takvimini planlayın.' },
      { icon: 'chart', title: 'Raporlar', text: 'Başarı, devam ve ödeme durumlarını grafiklerle takip edin.' },
    ],
  },
  {
    slug: 'iyiSite',
    name: 'iyiSite',
    icon: 'building',
    color: '#0ea5e9',
    tagline: 'Site ve apartman yönetimi',
    summary: 'Aidat, gider, duyuru ve sakin iletişimini şeffaf ve dijital hale getirin.',
    audience: 'Site yönetimleri, apartman yöneticileri ve profesyonel yönetim firmaları',
    features: [
      { icon: 'wallet', title: 'Aidat Takibi', text: 'Aidat borçlarını, tahsilatları ve gecikmeleri otomatik izleyin.' },
      { icon: 'receipt', title: 'Gelir & Gider', text: 'Tüm harcamaları kategorize edin, şeffaf raporlar paylaşın.' },
      { icon: 'megaphone', title: 'Duyurular', text: 'Sakinlere toplantı, bakım ve önemli duyuruları anında iletin.' },
      { icon: 'home', title: 'Blok & Daire Kayıtları', text: 'Malik ve kiracı bilgilerini daire bazında düzenli tutun.' },
      { icon: 'tool', title: 'Arıza & Talep', text: 'Sakinlerden gelen arıza ve talepleri takip edip sonuçlandırın.' },
      { icon: 'chart', title: 'Finansal Raporlar', text: 'Dönemsel bütçe ve kasa raporlarını tek tıkla oluşturun.' },
    ],
  },
  {
    slug: 'iyiAvukat',
    name: 'iyiAvukat',
    icon: 'scale',
    color: '#a855f7',
    tagline: 'Hukuk büroları için dava ve müvekkil yönetimi',
    summary: 'Dosyalarınızı, duruşma takviminizi ve müvekkil iletişimini yapay zekâ desteğiyle yönetin.',
    audience: 'Avukatlar, hukuk büroları ve şirket hukuk departmanları',
    features: [
      { icon: 'folder', title: 'Dava Dosyaları', text: 'Tüm dosya, evrak ve süreçleri tek yerde düzenli saklayın.' },
      { icon: 'calendar', title: 'Duruşma Takvimi', text: 'Duruşma ve kesin süreleri hatırlatmalarla kaçırmayın.' },
      { icon: 'users', title: 'Müvekkil Yönetimi', text: 'Müvekkil bilgileri, görüşme notları ve iletişim geçmişi.' },
      { icon: 'wallet', title: 'Vekalet Ücreti & Masraf', text: 'Ücret, avans ve masrafları dosya bazında takip edin.' },
      { icon: 'sparkles', title: 'Yapay Zekâ Asistanı', text: 'Belgeleri özetleyin, dilekçe taslakları için destek alın.' },
      { icon: 'lock', title: 'Güvenli Arşiv', text: 'Yetkilendirme ile hassas verileri güvenle koruyun.' },
    ],
  },
  {
    slug: 'iyiCrm',
    name: 'iyiCRM',
    icon: 'handshake',
    color: '#10b981',
    tagline: 'Satış ve müşteri ilişkileri yönetimi',
    summary: 'Müşterilerinizi, fırsatlarınızı ve tekliflerinizi takip ederek satışlarınızı büyütün.',
    audience: 'KOBİ’ler, satış ekipleri ve hizmet sağlayıcılar',
    features: [
      { icon: 'users', title: 'Müşteri Kartları', text: 'Firma ve kişi bilgileri, görüşme geçmişi ve notlar.' },
      { icon: 'funnel', title: 'Satış Hunisi', text: 'Fırsatları aşamalara göre sürükle-bırak ile yönetin.' },
      { icon: 'receipt', title: 'Teklif Hazırlama', text: 'Profesyonel teklifler oluşturun ve durumunu izleyin.' },
      { icon: 'check', title: 'Görev & Hatırlatma', text: 'Ekibinize görev atayın, takip aramalarını unutmayın.' },
      { icon: 'chart', title: 'Satış Raporları', text: 'Performansı, dönüşüm oranlarını ve ciroyu analiz edin.' },
      { icon: 'lock', title: 'Rol Bazlı Yetki', text: 'Ekip üyelerinin erişimlerini rollerine göre sınırlayın.' },
    ],
  },
  {
    slug: 'iyiBerber',
    name: 'iyiBerber',
    icon: 'scissors',
    color: '#f97316',
    tagline: 'Berber ve kuaförler için online randevu',
    summary: 'Müşterileriniz 7/24 online randevu alsın, siz işinize odaklanın.',
    audience: 'Berberler, kuaförler, güzellik ve bakım salonları',
    features: [
      { icon: 'calendar', title: 'Online Randevu', text: 'Müşteriler uygun saati görüp saniyeler içinde randevu alır.' },
      { icon: 'message', title: 'SMS & Bildirim', text: 'Otomatik hatırlatmalarla gelmeyen randevuları azaltın.' },
      { icon: 'users', title: 'Personel Takvimi', text: 'Her çalışanın hizmetlerini ve çalışma saatlerini yönetin.' },
      { icon: 'scissors', title: 'Hizmet & Fiyat Listesi', text: 'Hizmet sürelerini ve fiyatlarını kolayca düzenleyin.' },
      { icon: 'wallet', title: 'Kasa Takibi', text: 'Günlük ciro, ödeme ve personel primlerini izleyin.' },
      { icon: 'star', title: 'Müşteri Sadakati', text: 'Müşteri geçmişi ve tercihleriyle kişisel hizmet sunun.' },
    ],
  },
  {
    slug: 'iyiDernek',
    name: 'iyiDernek',
    icon: 'heart',
    color: '#ec4899',
    tagline: 'Dernek ve vakıf yönetimi',
    summary: 'Üye, aidat, bağış ve etkinlik süreçlerini dijitalleştirin.',
    audience: 'Dernekler, vakıflar, kulüpler ve sivil toplum kuruluşları',
    features: [
      { icon: 'users', title: 'Üye Yönetimi', text: 'Üye kayıtları, iletişim bilgileri ve üyelik durumları.' },
      { icon: 'wallet', title: 'Aidat & Bağış', text: 'Aidat tahsilatlarını ve bağışları kayıt altına alın.' },
      { icon: 'calendar', title: 'Etkinlik Planlama', text: 'Etkinlik oluşturun, katılımcıları takip edin.' },
      { icon: 'megaphone', title: 'Toplu Duyuru', text: 'Üyelerinize duyuru ve bilgilendirmeleri tek seferde iletin.' },
      { icon: 'folder', title: 'Karar & Evrak Arşivi', text: 'Yönetim kurulu kararlarını ve belgeleri düzenli saklayın.' },
      { icon: 'chart', title: 'Mali Raporlar', text: 'Gelir-gider ve bağış raporlarını kolayca hazırlayın.' },
    ],
  },
];

export const demoUrl = (p) => `https://${p.slug.toLowerCase()}.acaryasar.com`;
export const demoHost = (p) => `${p.slug}.acaryasar.com`;
