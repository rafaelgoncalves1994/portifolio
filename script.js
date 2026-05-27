const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const themeStorageKey = 'theme';

const getSavedTheme = () => {
  try {
    return localStorage.getItem(themeStorageKey) || 'dark';
  } catch {
    return 'dark';
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The visual theme still changes even when storage is unavailable.
  }
};

const setTheme = (theme) => {
  const isLight = theme === 'light';
  body.classList.toggle('light-theme', isLight);
  themeIcon?.classList.toggle('fa-sun', isLight);
  themeIcon?.classList.toggle('fa-moon', !isLight);
  themeToggle?.setAttribute('aria-pressed', String(isLight));
};

setTheme(getSavedTheme());

themeToggle?.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(nextTheme);
  saveTheme(nextTheme);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

const setMenuState = (isOpen) => {
  hamburger?.classList.toggle('open', isOpen);
  navLinks?.classList.toggle('open', isOpen);
  hamburger?.setAttribute('aria-expanded', String(isOpen));
  hamburger?.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
};

hamburger?.addEventListener('click', () => {
  setMenuState(!navLinks?.classList.contains('open'));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuState(false);
  }
});

const navbar = document.getElementById('navbar');

const updateNavbarShadow = () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
};

updateNavbarShadow();
window.addEventListener('scroll', updateNavbarShadow, { passive: true });

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const delay = entry.target.closest(
        '.about-grid, .stack-grid, .projects-grid, .contact-links',
      )
        ? Array.from(entry.target.parentElement.children).indexOf(
            entry.target,
          ) * 80
        : 0;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

const heroSub = document.querySelector('.hero-sub');
const phrases = [
  'Desenvolvedor Full Stack.',
  'Interfaces modernas e integração inteligente.',
  'Automação e soluções escaláveis.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 60;
const deletingSpeed = 24;
const pauseEnd = 1200;
const pauseStart = 250;

function typeWriter() {
  if (!heroSub) return;

  const current = phrases[phraseIndex];

  if (!isDeleting) {
    heroSub.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, pauseEnd);
      return;
    }
  } else {
    heroSub.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, pauseStart);
      return;
    }
  }

  setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
}

if (heroSub) {
  heroSub.classList.add('is-typing');
  typeWriter();
}

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => sectionObserver.observe(section));

const projectCases = {
  agenda: {
    theme: 'agenda',
    title: 'App de Agenda',
    category: 'Aplicação Mobile SaaS',
    status: 'Projeto privado em fase de lançamento',
    subtitle:
      'Sistema mobile completo para profissionais autônomos administrarem agenda, clientes, financeiro, serviços e produtos em um único ambiente.',
    problem:
      'Profissionais autônomos precisam conciliar horários, clientes, cobranças e serviços em ferramentas dispersas, perdendo contexto operacional.',
    solution:
      'Uma experiência mobile centraliza rotina, relacionamento e controle financeiro, com recursos para operação diária e evolução para planos premium.',
    cover: {
      src: './images/projects/agenda/agenda-capa.jpeg',
      alt: 'Tela principal do App de Agenda com calendário mensal e ação de novo agendamento.',
    },
    primaryStack: ['React Native', 'Expo SDK 54', 'TypeScript', 'Supabase'],
    features: [
      'Agenda',
      'Financeiro',
      'Clientes',
      'Serviços',
      'Produtos',
      'Notificações',
      'WhatsApp',
      'Agendamento público',
      'Premium / free',
      'Temas',
      'Perfil customizado',
    ],
    stack: [
      { label: 'Frontend', value: 'React Native · Expo SDK 54 · TypeScript' },
      { label: 'Backend', value: 'Supabase' },
      { label: 'Banco', value: 'PostgreSQL · RLS' },
      { label: 'Infraestrutura', value: 'EAS Build' },
      { label: 'Autenticação', value: 'Supabase Auth' },
      {
        label: 'Integrações',
        value: 'Notifications · Contacts · Image Picker',
      },
    ],
    gallery: [
      {
        label: 'Agenda',
        src: './images/projects/agenda/agenda-capa.jpeg',
        alt: 'Tela principal com calendário mensal, novo agendamento e próximos compromissos.',
      },
      {
        label: 'Financeiro',
        src: './images/projects/agenda/financeiro.jpeg',
        alt: 'Tela financeira com saldo, entradas, saídas e metas.',
      },
      {
        label: 'Clientes',
        src: './images/projects/agenda/clientes.jpeg',
        alt: 'Tela de clientes com busca, contatos e ações rápidas.',
      },
      {
        label: 'Perfil',
        src: './images/projects/agenda/perfil.jpeg',
        alt: 'Tela de perfil com serviços, configurações e recursos premium.',
      },
    ],
    highlights: [
      { icon: 'fa-shield-halved', label: 'RLS' },
      { icon: 'fa-layer-group', label: 'Arquitetura modular' },
      { icon: 'fa-database', label: 'Persistência local' },
      { icon: 'fa-bell', label: 'Notificações locais' },
      { icon: 'fa-key', label: 'Permissões' },
      { icon: 'fa-lock', label: 'Autenticação segura' },
    ],
  },
  media: {
    theme: 'media',
    title: 'Media Player App',
    category: 'Streaming / Media Platform',
    status: 'Projeto privado em desenvolvimento',
    subtitle:
      'Aplicativo mobile para organização e reprodução de conteúdos multimídia utilizando autenticação por servidor externo configurado pelo usuário.',
    problem:
      'Conteúdos distribuídos em servidores pessoais exigem uma experiência organizada, segura e confortável para descoberta e reprodução contínua.',
    solution:
      'O aplicativo organiza bibliotecas de mídia, preserva preferências e oferece reprodução fluida para TV ao vivo, filmes e séries.',
    cover: {
      src: './images/projects/media-player/home-capa.jpeg',
      alt: 'Tela inicial do Media Player com TV ao vivo, filmes, séries e conteúdo em andamento.',
    },
    primaryStack: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    features: [
      'TV ao vivo',
      'Filmes',
      'Séries',
      'Favoritos',
      'Histórico',
      'Continue assistindo',
      'Player fullscreen',
      'Busca',
      'Temas',
      'Reprodução HLS',
    ],
    stack: [
      { label: 'Frontend', value: 'React Native · Expo · TypeScript' },
      { label: 'Backend', value: 'Servidor externo configurável' },
      { label: 'Banco', value: 'AsyncStorage' },
      { label: 'Infraestrutura', value: 'Expo' },
      { label: 'Autenticação', value: 'Expo SecureStore' },
      { label: 'Integrações', value: 'Axios · Reprodução HLS' },
    ],
    gallery: [
      {
        label: 'Início',
        src: './images/projects/media-player/home-capa.jpeg',
        alt: 'Tela principal com TV ao vivo, filmes, séries e continuar assistindo.',
      },
      {
        label: 'Login protegido',
        src: './images/projects/media-player/login-protegido.jpeg',
        alt: 'Tela de autenticação com a identidade inédita do aplicativo protegida.',
      },
    ],
    highlights: [
      { icon: 'fa-play', label: 'Playback HLS' },
      { icon: 'fa-lock', label: 'SecureStore' },
      { icon: 'fa-clock-rotate-left', label: 'Histórico local' },
      { icon: 'fa-heart', label: 'Favoritos' },
      { icon: 'fa-display', label: 'Player fullscreen' },
      { icon: 'fa-layer-group', label: 'Estado com Zustand' },
    ],
  },
  church: {
    theme: 'church',
    title: 'Paz Church VR',
    category: 'Plataforma Web Institucional',
    status: 'Em produção',
    siteUrl: 'https://paz-church-vr.vercel.app/',
    subtitle:
      'Plataforma web integrada para comunidade, transmissão digital, eventos e formulários inteligentes.',
    problem:
      'A comunidade precisa encontrar transmissões, atividades e canais de atendimento em um ponto digital acessível e confiável.',
    solution:
      'Uma plataforma web conecta conteúdo ao vivo, eventos e formulários com integrações serverless voltadas a alcance e operação simples.',
    cover: {
      src: './images/projects/paz-church/home-capa.png',
      alt: 'Página inicial da Paz Church com destaque para transmissão online e informações do campus.',
    },
    primaryStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel Functions'],
    features: [
      'Cultos online',
      'Eventos',
      'Life groups',
      'Ministérios',
      'Pedidos de oração',
      'YouTube',
      'Formulários protegidos',
      'PIX',
      'APIs serverless',
    ],
    stack: [
      { label: 'Frontend', value: 'React · TypeScript · Tailwind CSS · Vite' },
      { label: 'Backend', value: 'Express · Vercel Functions' },
      { label: 'Banco', value: 'Google Sheets' },
      { label: 'Infraestrutura', value: 'Vercel' },
      { label: 'Autenticação', value: 'Validação de formulários' },
      { label: 'Integrações', value: 'YouTube API · Google Apps Script' },
    ],
    gallery: [
      {
        label: 'Início',
        src: './images/projects/paz-church/home-capa.png',
        alt: 'Página inicial com transmissão em destaque e localização do campus.',
      },
      {
        label: 'Conteúdos',
        src: './images/projects/paz-church/home-conteudos.png',
        alt: 'Continuação da página inicial com séries, eventos, voluntariado e pedido de oração.',
      },
      {
        label: 'Cultos',
        src: './images/projects/paz-church/cultos.png',
        alt: 'Página de cultos com transmissão online, horários e mensagens recentes.',
      },
      {
        label: 'Oração',
        src: './images/projects/paz-church/oracao.png',
        alt: 'Página de pedido de oração com formulário e informações de contato.',
      },
      {
        label: 'Life Groups',
        src: './images/projects/paz-church/life-groups.png',
        alt: 'Página de grupos com cards de comunidades disponíveis.',
      },
    ],
    highlights: [
      { icon: 'fa-cloud', label: 'Vercel Functions' },
      { icon: 'fa-video', label: 'YouTube API' },
      { icon: 'fa-bolt', label: 'Cache' },
      { icon: 'fa-shield-halved', label: 'Anti-spam' },
      { icon: 'fa-check', label: 'Validação' },
      { icon: 'fa-code-branch', label: 'Arquitetura híbrida' },
    ],
  },
  prisma: {
    theme: 'prisma',
    title: 'Prisma Analytics',
    category: 'AI Educational Platform / Data Analysis Tool',
    status: 'MVP funcional / Em evolução contínua',
    siteUrl: 'https://rafaelgoncalves1994.github.io/Prisma-analytcs/',
    subtitle:
      'Transformando dados educacionais em análises inteligentes através de IA generativa.',
    problem:
      'Muitos estudantes e professores possuem dificuldade para interpretar dados, estruturar análises e transformar informações acadêmicas em insights úteis. O Prisma Analytics simplifica esse processo com análises acessíveis, didáticas e orientadas por dados.',
    solution:
      'O usuário seleciona um tema e informa uma pergunta para receber uma análise gerada por IA, com opções para exportar tabelas para Excel, salvar conteúdos em TXT e copiar resultados rapidamente.',
    cover: {
      src: './images/projects/prisma-analytics/analise-capa.png',
      alt: 'Tela principal do Prisma Analytics com formulário para geração de análise inteligente.',
    },
    primaryStack: ['HTML5', 'JavaScript', 'OpenAI API', 'SheetJS'],
    features: [
      'Análises com IA',
      'Simulação estatística',
      'Exportação Excel',
      'Exportação TXT',
      'Cópia rápida',
      'API Key local',
      'Conversão Markdown',
      'Interface educacional',
      'Temas acadêmicos',
      'Experiência simplificada',
    ],
    stack: [
      { label: 'Frontend', value: 'HTML5 · CSS3 · JavaScript Vanilla' },
      { label: 'IA', value: 'OpenAI API' },
      { label: 'Processamento', value: 'Showdown.js · SheetJS' },
      { label: 'Persistência', value: 'LocalStorage' },
      { label: 'Deploy', value: 'GitHub Pages' },
    ],
    gallery: [
      {
        label: 'Gerar análise',
        src: './images/projects/prisma-analytics/analise-capa.png',
        alt: 'Tela principal com seleção de tema, pergunta, resultado e comandos de exportação.',
      },
      {
        label: 'Tutorial API',
        src: './images/projects/prisma-analytics/tutorial-api.png',
        alt: 'Tela de tutorial para configuração segura da chave da API.',
      },
    ],
    highlights: [
      { icon: 'fa-message', label: 'Engenharia de Prompt' },
      { icon: 'fa-code', label: 'Markdown para HTML' },
      { icon: 'fa-file-excel', label: 'Exportação Excel' },
      { icon: 'fa-key', label: 'API Key local' },
      { icon: 'fa-chart-line', label: 'Simulação estatística' },
      { icon: 'fa-wand-magic-sparkles', label: 'OpenAI API' },
      { icon: 'fa-feather', label: 'Sem frameworks' },
      { icon: 'fa-cloud-arrow-up', label: 'GitHub Pages' },
    ],
    process: [
      'O projeto foi desenvolvido priorizando simplicidade, acessibilidade e experiência funcional, utilizando IA generativa para criação de análises orientadas por dados.',
      'Ferramentas modernas de IA foram utilizadas para acelerar prototipação, estruturação lógica e produtividade durante o desenvolvimento, mantendo validação técnica e controle arquitetural do projeto.',
    ],
    differentials: [
      'Foco educacional',
      'Simplicidade e acessibilidade',
      'Insights automáticos',
      'Automação de tabelas',
      'Experiência leve',
      'Sem backend complexo',
    ],
  },
};

const formationPrograms = {
  ads: {
    theme: 'academic',
    category: 'Formação acadêmica',
    status: 'Cursando',
    title: 'Análise e Desenvolvimento de Sistemas',
    provider: 'UniFOA - Centro Universitário de Volta Redonda',
    summary:
      'Graduação tecnológica orientada ao desenvolvimento de sistemas, fundamentos de engenharia de software, banco de dados, interfaces web e computação em nuvem.',
    tags: ['ADS', 'Engenharia de Software', 'Banco de Dados', 'APIs', 'Arquitetura'],
    skills: ['Lógica', 'SQL', 'Desenvolvimento de Sistemas', 'Interfaces Web', 'Cloud Computing', 'Governança de TI'],
    modules: [
      'Algoritmos e Técnicas de Programação e Web services para mobile.',
      'Programação para dispositivos móveis e Engenharia de Requisitos de Software.',
      'Banco de Dados, Programação Orientada por Objetos e Fundamentos de ADS.',
      'Desenvolvimento Web Full Stack e Desenvolvimento de Interfaces Web.',
      'Cloud Computing e Governança de Tecnologia da Informação.',
    ],
    document: {
      title: 'Matriz curricular',
      src: './documents/formation/ads-matriz-curricular.pdf',
      action: 'Abrir matriz curricular',
    },
  },
  fullstack: {
    theme: 'fullstack',
    category: 'Especialização técnica',
    status: 'Completo',
    title: 'Full Stack Impressionador',
    provider: 'Hashtag Treinamentos - 260 horas',
    summary:
      'Formação concluída em desenvolvimento web Full Stack, percorrendo fundamentos, frontend moderno, backend com APIs, React e banco de dados relacional.',
    tags: ['Full Stack', 'React', 'Node.js', 'Express', 'PostgreSQL'],
    skills: ['HTML5 e CSS3', 'JavaScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Git e GitHub', 'Tailwind CSS'],
    modules: [
      'Fundamentos de HTML, CSS e JavaScript, DOM, formulários e localStorage.',
      'JavaScript intermediário, módulos ES6, orientação a objetos e controle de versões.',
      'Frontend moderno com responsividade, Tailwind CSS e projetos aplicados.',
      'Backend moderno com Node.js, APIs, ExpressJS, middlewares e bancos de dados.',
      'React avançado, integração com APIs e PostgreSQL.',
      'Projeto Full Stack e imersão JavaScript na prática.',
    ],
    document: {
      title: 'Certificado de conclusão',
      src: './documents/formation/full-stack-impressionador-certificado.pdf',
      action: 'Abrir certificado',
    },
  },
  claude: {
    theme: 'claude',
    category: 'IA & produtividade',
    status: 'Completo',
    title: 'Claude Impressionador',
    provider: 'Hashtag Treinamentos - 15 horas',
    summary:
      'Especialização concluída em ferramentas Claude e uso prático de inteligência artificial para produtividade e fluxos de desenvolvimento.',
    tags: ['Claude Code', 'IA', 'Cowork', 'Produtividade'],
    skills: ['Claude Code', 'Ecossistema Claude', 'Fundamentos de IA', 'Cowork', 'Excel com Claude'],
    modules: [
      'Introdução ao ecossistema de IA do Claude.',
      'Introdução ao Cowork.',
      'Introdução e fundamentos do Claude Code.',
      'Fundamentos de IA para não desenvolvedores.',
      'Excel com Claude.',
    ],
    document: {
      title: 'Certificado de conclusão',
      src: './documents/formation/claude-impressionador-certificado.pdf',
      action: 'Abrir certificado',
    },
  },
  supabase: {
    theme: 'supabase',
    category: 'Dados & backend',
    status: 'Cursando',
    title: 'Supabase / Banco de Dados',
    provider: 'Comunidade Hashtag',
    summary:
      'Curso em andamento voltado ao aprofundamento em banco de dados utilizando Supabase em aplicações modernas.',
    tags: ['Supabase', 'Banco de Dados'],
    skills: ['Supabase', 'Banco de Dados'],
    modules: [
      'Formação em andamento com foco informado em banco de dados utilizando Supabase.',
    ],
  },
  balf: {
    theme: 'balf',
    category: 'Salesforce ecosystem',
    status: 'Cursando',
    title: 'BALF 360',
    provider: 'Reforce Academy',
    summary:
      'Ambiente estruturado de aceleração no ecossistema Salesforce, com visão conectada de automação, dados, desenvolvimento e agentes inteligentes.',
    tags: ['Salesforce', 'Agentforce', 'Flow', 'Data 360', 'Apex'],
    skills: ['Salesforce Flow', 'Slack', 'Data 360', 'Apex', 'Agentforce'],
    modules: [
      'Flow como execução e orquestração.',
      'Slack como camada operacional de times modernos.',
      'Data 360 como base para inteligência real.',
      'Apex como profundidade, performance e arquitetura.',
      'Agentforce como perspectiva de trabalho autônomo e inteligente.',
    ],
    reference: {
      label: 'Ver referência pública do programa',
      href: 'https://trailblazercommunitygroups.com/events/details/salesforce-salesforce-admin-group-vitoria-brazil-presents-balf-360-keynote-beyond-flow-the-architecture-of-relevance/',
    },
  },
};

const caseModal = document.getElementById('caseModal');
const caseDialog = document.getElementById('caseDialog');
const caseScroll = caseModal?.querySelector('.case-scroll');
const caseHeroCover = document.getElementById('caseHeroCover');
const defaultCaseHeroVisual = caseHeroCover?.firstElementChild?.cloneNode(true);
const defaultCaseProcess =
  'Uso ferramentas modernas de IA para acelerar prototipação, automações e produtividade durante o desenvolvimento, mantendo validação técnica, revisão de código e decisões arquiteturais sob minha responsabilidade.';
const caseFields = {
  category: document.getElementById('caseCategory'),
  status: document.getElementById('caseStatus'),
  siteLink: document.getElementById('caseSiteLink'),
  title: document.getElementById('caseTitle'),
  subtitle: document.getElementById('caseSubtitle'),
  problem: document.getElementById('caseProblem'),
  solution: document.getElementById('caseSolution'),
  primaryStack: document.getElementById('casePrimaryStack'),
  features: document.getElementById('caseFeatures'),
  stack: document.getElementById('caseStack'),
  gallery: document.getElementById('caseGallery'),
  highlights: document.getElementById('caseHighlights'),
  process: document.getElementById('caseProcess'),
  differentialsBlock: document.getElementById('caseDifferentialsBlock'),
  differentials: document.getElementById('caseDifferentials'),
};
let caseReturnFocus = null;

const addTextElements = (container, items, tagName, className = '') => {
  const elements = items.map((item) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = item;
    return element;
  });

  container?.replaceChildren(...elements);
};

const renderCase = (caseId) => {
  const selectedCase = projectCases[caseId];
  if (!selectedCase || !caseModal || !caseDialog) return;

  caseModal.classList.remove(
    'case-modal--agenda',
    'case-modal--media',
    'case-modal--church',
    'case-modal--prisma',
  );
  caseModal.classList.add(`case-modal--${selectedCase.theme}`, 'is-open');
  caseModal.setAttribute('aria-hidden', 'false');

  caseFields.category.textContent = selectedCase.category;
  caseFields.status.textContent = selectedCase.status;
  if (caseFields.siteLink) {
    const hasPublicSite = Boolean(selectedCase.siteUrl);
    caseFields.siteLink.hidden = !hasPublicSite;
    if (hasPublicSite) {
      caseFields.siteLink.href = selectedCase.siteUrl;
      caseFields.siteLink.setAttribute('aria-label', `Ver site de ${selectedCase.title}`);
    } else {
      caseFields.siteLink.removeAttribute('href');
      caseFields.siteLink.removeAttribute('aria-label');
    }
  }
  caseFields.title.textContent = selectedCase.title;
  caseFields.subtitle.textContent = selectedCase.subtitle;
  caseFields.problem.textContent = selectedCase.problem;
  caseFields.solution.textContent = selectedCase.solution;

  caseHeroCover?.classList.toggle(
    'case-hero-cover--media',
    Boolean(selectedCase.cover),
  );
  if (selectedCase.cover && caseHeroCover) {
    const coverImage = document.createElement('img');
    coverImage.className = 'case-cover-image';
    coverImage.src = selectedCase.cover.src;
    coverImage.alt = selectedCase.cover.alt;
    coverImage.loading = 'eager';
    caseHeroCover.replaceChildren(coverImage);
  } else if (caseHeroCover && defaultCaseHeroVisual) {
    caseHeroCover.replaceChildren(defaultCaseHeroVisual.cloneNode(true));
  }

  addTextElements(caseFields.primaryStack, selectedCase.primaryStack, 'span');
  addTextElements(caseFields.features, selectedCase.features, 'li');

  const stackGroups = selectedCase.stack.map((group) => {
    const block = document.createElement('div');
    block.className = 'case-stack-group';

    const label = document.createElement('small');
    label.textContent = group.label;

    const value = document.createElement('span');
    value.textContent = group.value;

    block.append(label, value);
    return block;
  });
  caseFields.stack.replaceChildren(...stackGroups);

  const galleryLabels = selectedCase.gallery || [
    'Visão geral',
    'Fluxo principal',
    'Detalhes',
  ];
  const galleryShots = galleryLabels.map((item, index) => {
    const label = typeof item === 'string' ? item : item.label;
    const shot = document.createElement('div');
    shot.className = `gallery-shot${index === 0 ? ' gallery-shot--wide' : ''}${typeof item === 'string' ? '' : ' gallery-shot--media'}`;

    if (typeof item !== 'string') {
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      shot.append(image);
    }

    const text = document.createElement('span');
    text.textContent = label;
    shot.append(text);
    return shot;
  });
  const hasGalleryMedia = galleryLabels.some(
    (item) => typeof item !== 'string',
  );
  caseFields.gallery.classList.toggle(
    'case-gallery--expanded',
    galleryLabels.length > 3,
  );
  caseFields.gallery.classList.toggle('case-gallery--screens', hasGalleryMedia);
  caseFields.gallery.classList.toggle(
    'case-gallery--two',
    hasGalleryMedia && galleryLabels.length === 2,
  );
  caseFields.gallery.replaceChildren(...galleryShots);

  const highlightCards = selectedCase.highlights.map((highlight) => {
    const card = document.createElement('div');
    card.className = 'case-highlight';

    const icon = document.createElement('i');
    icon.className = `fas ${highlight.icon}`;
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = highlight.label;

    card.append(icon, label);
    return card;
  });
  caseFields.highlights.replaceChildren(...highlightCards);

  const processParagraphs = selectedCase.process || [defaultCaseProcess];
  const processElements = processParagraphs.map((text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  });
  caseFields.process.replaceChildren(...processElements);

  const differentials = selectedCase.differentials || [];
  addTextElements(
    caseFields.differentials,
    differentials,
    'div',
    'case-differential',
  );
  caseFields.differentialsBlock.hidden = !differentials.length;

  caseReturnFocus = document.activeElement;
  document.body.classList.add('case-modal-open');
  if (caseScroll) caseScroll.scrollTop = 0;
  caseDialog.focus();
};

const closeCase = () => {
  if (!caseModal?.classList.contains('is-open')) return;

  caseModal.classList.remove('is-open');
  caseModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('case-modal-open');
  caseReturnFocus?.focus();
};

document.querySelectorAll('[data-case-open]').forEach((button) => {
  button.addEventListener('click', () => renderCase(button.dataset.caseOpen));
});

caseModal?.querySelectorAll('[data-case-close]').forEach((button) => {
  button.addEventListener('click', closeCase);
});

const labsModal = document.getElementById('labsModal');
const labsDialog = document.getElementById('labsDialog');
const labsOpen = document.getElementById('labsOpen');
const labsScroll = labsModal?.querySelector('.labs-scroll');
let labsReturnFocus = null;

const openLabs = () => {
  if (!labsModal || !labsDialog) return;

  labsReturnFocus = document.activeElement;
  labsModal.classList.add('is-open');
  labsModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('case-modal-open');
  if (labsScroll) labsScroll.scrollTop = 0;
  labsDialog.focus();
};

const closeLabs = () => {
  if (!labsModal?.classList.contains('is-open')) return;

  labsModal.classList.remove('is-open');
  labsModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('case-modal-open');
  labsReturnFocus?.focus();
};

labsOpen?.addEventListener('click', openLabs);

labsModal?.querySelectorAll('[data-labs-close]').forEach((button) => {
  button.addEventListener('click', closeLabs);
});

const formationModal = document.getElementById('formationModal');
const formationDialog = document.getElementById('formationDialog');
const formationScroll = formationModal?.querySelector('.formation-scroll');
const formationFields = {
  category: document.getElementById('formationCategory'),
  status: document.getElementById('formationStatus'),
  title: document.getElementById('formationTitle'),
  provider: document.getElementById('formationProvider'),
  summary: document.getElementById('formationSummary'),
  tags: document.getElementById('formationTags'),
  skills: document.getElementById('formationSkills'),
  modules: document.getElementById('formationModules'),
  documentTitle: document.getElementById('formationDocumentTitle'),
  document: document.getElementById('formationDocument'),
};
let formationReturnFocus = null;

const renderFormationDocument = (program) => {
  if (!formationFields.document) return;

  if (program.document) {
    formationFields.documentTitle.textContent = program.document.title;

    const frame = document.createElement('div');
    frame.className = 'formation-document-frame';

    const iframe = document.createElement('iframe');
    iframe.src = `${program.document.src}#view=FitH`;
    iframe.title = `${program.document.title} - ${program.title}`;
    iframe.loading = 'lazy';
    frame.append(iframe);

    const action = document.createElement('a');
    action.className = 'formation-document-action';
    action.href = program.document.src;
    action.target = '_blank';
    action.rel = 'noopener noreferrer';
    action.innerHTML = `${program.document.action} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>`;

    formationFields.document.replaceChildren(frame, action);
    return;
  }

  formationFields.documentTitle.textContent = 'Acompanhamento';

  const empty = document.createElement('div');
  empty.className = 'formation-document-empty';

  const icon = document.createElement('i');
  icon.className = 'fas fa-hourglass-half';
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('p');
  text.textContent = 'Formação em andamento. Nenhum documento anexado neste momento.';
  empty.append(icon, text);

  if (program.reference) {
    const reference = document.createElement('a');
    reference.className = 'formation-document-action';
    reference.href = program.reference.href;
    reference.target = '_blank';
    reference.rel = 'noopener noreferrer';
    reference.innerHTML = `${program.reference.label} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>`;
    formationFields.document.replaceChildren(empty, reference);
  } else {
    formationFields.document.replaceChildren(empty);
  }
};

const openFormation = (programId) => {
  const program = formationPrograms[programId];
  if (!program || !formationModal || !formationDialog) return;

  formationModal.classList.remove(
    'formation-modal--academic',
    'formation-modal--fullstack',
    'formation-modal--claude',
    'formation-modal--supabase',
    'formation-modal--balf',
  );
  formationModal.classList.add(`formation-modal--${program.theme}`, 'is-open');
  formationModal.setAttribute('aria-hidden', 'false');

  formationFields.category.textContent = program.category;
  formationFields.status.textContent = program.status;
  formationFields.title.textContent = program.title;
  formationFields.provider.textContent = program.provider;
  formationFields.summary.textContent = program.summary;
  addTextElements(formationFields.tags, program.tags, 'span');
  addTextElements(formationFields.skills, program.skills, 'span');
  addTextElements(formationFields.modules, program.modules, 'li');
  renderFormationDocument(program);

  formationReturnFocus = document.activeElement;
  document.body.classList.add('case-modal-open');
  if (formationScroll) formationScroll.scrollTop = 0;
  formationDialog.focus();
};

const closeFormation = () => {
  if (!formationModal?.classList.contains('is-open')) return;

  formationModal.classList.remove('is-open');
  formationModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('case-modal-open');
  formationFields.document?.replaceChildren();
  formationReturnFocus?.focus();
};

document.querySelectorAll('[data-formation-open]').forEach((button) => {
  button.addEventListener('click', () => openFormation(button.dataset.formationOpen));
});

formationModal?.querySelectorAll('[data-formation-close]').forEach((button) => {
  button.addEventListener('click', closeFormation);
});

document.addEventListener('keydown', (event) => {
  const activeDialog = caseModal?.classList.contains('is-open')
    ? caseDialog
    : labsModal?.classList.contains('is-open')
      ? labsDialog
      : formationModal?.classList.contains('is-open')
        ? formationDialog
      : null;

  if (!activeDialog) return;

  if (event.key === 'Escape') {
    if (activeDialog === caseDialog) {
      closeCase();
    } else if (activeDialog === labsDialog) {
      closeLabs();
    } else {
      closeFormation();
    }
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = [
    ...activeDialog.querySelectorAll(
      'button, [href], [tabindex]:not([tabindex="-1"])',
    ),
  ];
  if (!focusable.length) return;

  const firstElement = focusable[0];
  const lastElement = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});
