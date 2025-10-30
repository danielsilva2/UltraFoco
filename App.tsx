import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- CONSTANTS ---
const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'Prova Visual', href: '#proof' },
    { name: 'A Solução', href: '#solutions' },
    { name: 'Tecnologia', href: '#tech' },
];

const PARTNER_LOGOS = [
    { name: 'cliente1', logo: 'img/cliente1.png' },
    { name: 'cliente2', logo: 'img/cliente2.png' },
    { name: 'cliente3', logo: 'img/cliente3.png' },
    { name: 'cliente4', logo: 'img/cliente4.png' },
    { name: 'cliente5', logo: 'img/cliente5.png' },
    { name: 'cliente6', logo: 'img/cliente6.png' },
    { name: 'cliente8', logo: 'img/cliente8.png' },
    { name: 'cliente9', logo: 'img/cliente9.png' },
    { name: 'cliente10', logo: 'img/cliente10.png' },
];

const SOLUTIONS = [
    {
        icon: 'Api',
        title: 'API Deep Enhance',
        description: 'Integração B2B para processamento massivo de imagens. Escale sua operação com nossa IA de ponta, otimizando milhares de fotos em minutos.',
    },
    {
        icon: 'Studio',
        title: 'Kit Estúdio & Logística',
        description: 'Uma solução híbrida que combina nosso software com kits de estúdio móvel e logística para garantir a captura perfeita da imagem na fonte.',
    },
    {
        icon: '360',
        title: 'App 360° Automotivo',
        description: 'Produto de nicho focado no setor automotivo. Capture e crie experiências 360° imersivas de veículos diretamente do seu smartphone.',
    },
];

const TECH_DETAILS = [
    {
        title: 'Core Technology: Deep Enhance AI',
        description: 'Nosso modelo proprietário de IA, "Deep Enhance", foi treinado com milhões de imagens de produtos para entender o que gera conversão. Ele executa uma série de otimizações automáticas.',
        points: ['Redução de Ruído Inteligente', 'Remoção de Fundo e Limpeza', 'Ajuste de Iluminação e Cores', 'Nitidez Seletiva (Foco no Produto)'],
        visual: 'diagram',
    },
    {
        title: 'ROI Comprovado e Análise de Dados',
        description: 'A qualidade visual impacta diretamente a performance de vendas. Nossos clientes observam melhorias mensuráveis em métricas chave, resultando em um retorno sobre o investimento claro e rápido.',
        points: ['Aumento de Cliques (CTR)', 'Redução do Tempo de Venda', 'Maior Valor Percebido', 'Consistência de Marca'],
        visual: 'chart',
    },
];

// --- SVG ICONS ---
const ApiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);
const StudioIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
);
const ThreeSixtyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
);
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ICONS: { [key: string]: React.FC<{ className?: string }> } = {
    Api: ApiIcon,
    Studio: StudioIcon,
    '360': ThreeSixtyIcon,
};


// --- REUSABLE COMPONENTS ---
const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        let start = 0;
        const duration = 2000;
        const end = target;
        const incrementTime = (1 / end) * (duration / end);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, incrementTime);
    }, [target]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [animate]);

    return <span ref={ref}>{count}</span>;
};


const ImageComparison: React.FC = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const beforeImage = 'img/lava-seca-antes.webp';
    const afterImage = 'img/lava-seca-depois.webp';

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-lg overflow-hidden border-4 border-brand-gray shadow-2xl">
            <img src={beforeImage} alt="Antes" className="absolute inset-0 w-full h-full object-cover" />
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
            >
                <img src={afterImage} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div
                className="absolute inset-0 bg-white/20"
                style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
            ></div>
             <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
            />
            <div
                className="absolute top-0 bottom-0 w-1 bg-brand-indigo pointer-events-none"
                style={{ left: `calc(${sliderValue}% - 2px)` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-brand-indigo border-4 border-brand-gray-light flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                </div>
            </div>
            <div className="absolute top-4 left-4 bg-black/50 text-white py-1 px-3 rounded-md font-semibold">BAIXA QUALIDADE</div>
            <div className="absolute top-4 right-4 bg-brand-indigo/80 text-white py-1 px-3 rounded-md font-semibold">ULTRA FOCO</div>
        </div>
    );
};

// --- SECTIONAL COMPONENTS ---
const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-brand-gray/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" className="text-2xl font-montserrat font-extrabold tracking-tight">
                    ULTRA <span className="brand-gradient">FOCO</span>
                </a>
                <div className="hidden md:flex space-x-8 items-center">
                    {NAV_LINKS.map((link) => (
                        <a key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors font-medium">
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="bg-brand-indigo hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-md transition-transform hover:scale-105">
                        Agendar Reunião
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                        {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>
            </nav>
            {isOpen && (
                <div className="md:hidden bg-brand-gray">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        {NAV_LINKS.map((link) => (
                            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                {link.name}
                            </a>
                        ))}
                        <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-indigo hover:bg-violet-500 text-white font-bold py-3 px-5 rounded-md transition-transform hover:scale-105 w-full text-center mt-2">
                            Agendar Reunião
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

const HeroSection: React.FC = () => {
     const [offsetY, setOffsetY] = useState(0);
     const handleScroll = () => setOffsetY(window.pageYOffset);

     useEffect(() => {
         window.addEventListener('scroll', handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
     }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed z-0 opacity-10"
                style={{ 
                    backgroundImage: `url('https://picsum.photos/seed/ai-network/1920/1080')`,
                    transform: `translateY(${offsetY * 0.4}px)`
                }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gray-dark via-transparent to-brand-gray-dark z-10"></div>
            
            <div className="relative z-20 container mx-auto px-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-extrabold tracking-tighter uppercase">
                    ULTRA FOCO: AI FOR SALES.
                    <br />
                    <span className="brand-gradient">NOT JUST PHOTOS.</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                    A Tecnologia que Transforma Fotos Comuns em Vendas Máximas.
                </p>
                <a href="#contact" className="mt-10 inline-block bg-brand-indigo hover:bg-violet-500 text-white font-bold text-lg py-4 px-10 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30">
                    Solicitar Demonstração Gratuita
                </a>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 pb-10">
                <div className="container mx-auto px-6">
                    <p className="text-center text-gray-400 mb-4 text-sm font-semibold uppercase tracking-wider">Confiança de Líderes de Mercado</p>
                    <div className="relative w-full overflow-hidden bg-brand-gray-dark/50 py-4 rounded-lg">
                        <div className="flex animate-marquee">
                            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, index) => (
                                <div key={index} className="flex-shrink-0 w-48 flex items-center justify-center">
                                    <img src={partner.logo} alt={partner.name} className="max-h-20 max-w-full" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-gray-dark via-transparent to-brand-gray-dark"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const VisualProofSection: React.FC = () => {
    return (
        <section id="proof" className="py-20 md:py-32 bg-brand-gray">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-montserrat font-bold">
                    O Impacto <span className="brand-gradient">Visual é Real</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400 md:text-lg">
                    Veja a transformação instantânea que nossa IA proporciona. De uma imagem comum para uma foto de alta conversão.
                </p>
                <div className="mt-12">
                    <ImageComparison />
                </div>
                <div className="mt-16 bg-brand-gray-dark p-8 rounded-lg max-w-md mx-auto shadow-2xl border border-brand-gray/50">
                    <p className="text-5xl md:text-6xl font-extrabold text-brand-indigo">
                        +<AnimatedCounter target={18} />%
                    </p>
                    <p className="mt-2 text-xl font-semibold text-gray-200">CTR Comprovado</p>
                    <p className="mt-1 text-gray-400">Aumento médio na taxa de cliques observado por nossos parceiros.</p>
                </div>
            </div>
        </section>
    );
};

const SolutionsSection: React.FC = () => {
    return (
        <section id="solutions" className="py-20 md:py-32 bg-brand-gray-dark">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-montserrat font-bold">
                    Uma Solução <span className="brand-gradient">Flexível para Cada Negócio</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-400 md:text-lg">
                    Seja qual for a sua escala ou necessidade, temos um pilar de serviço desenhado para maximizar seus resultados visuais.
                </p>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SOLUTIONS.map((solution) => {
                        const Icon = ICONS[solution.icon];
                        return (
                            <div key={solution.title} className="bg-brand-gray p-8 rounded-lg border border-gray-700/50 hover:border-brand-indigo transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-indigo-500/20">
                                <div className="inline-block p-4 bg-brand-indigo/10 rounded-lg">
                                    <Icon className="h-10 w-10 text-brand-indigo" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold font-montserrat">{solution.title}</h3>
                                <p className="mt-4 text-gray-400">{solution.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const TechDetailSection: React.FC = () => {
    return (
        <section id="tech" className="py-20 md:py-32 bg-brand-gray">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-montserrat font-bold">
                        Tecnologia & <span className="brand-gradient">Retorno Financeiro</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 md:text-lg">
                        Entenda como nossa tecnologia de ponta se traduz em resultados financeiros tangíveis para o seu negócio.
                    </p>
                </div>
                <div className="space-y-24">
                    {TECH_DETAILS.map((detail, index) => (
                        <div key={detail.title} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="md:w-1/2">
                                <h3 className="text-3xl font-bold font-montserrat mb-4">{detail.title}</h3>
                                <p className="text-gray-400 mb-6">{detail.description}</p>
                                <ul className="space-y-3">
                                    {detail.points.map(point => (
                                        <li key={point} className="flex items-center">
                                            <svg className="w-5 h-5 text-brand-violet mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span className="text-gray-300">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 w-full p-8 bg-brand-gray-dark rounded-lg border border-gray-700/50">
                                {detail.visual === 'diagram' ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4"><div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center text-xs text-center p-1">RAW IMAGE</div><div className="text-brand-violet text-3xl font-thin">→</div><div className="flex-1 h-16 bg-brand-indigo/20 rounded-md flex items-center justify-center font-bold">DEEP ENHANCE AI</div><div className="text-brand-violet text-3xl font-thin">→</div><div className="w-16 h-16 bg-brand-indigo rounded-md flex items-center justify-center text-xs text-center p-1 text-white">ULTRA FOCO</div></div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-bold text-lg mb-4 text-white">Aumento de Qualidade vs. Tempo</p>
                                        <div className="flex items-end h-40 space-x-4 relative pt-4">
                                            <div className="absolute left-0 top-0 h-full w-px bg-gray-600"></div>
                                            <div className="flex-1 flex flex-col items-center justify-end relative">
                                                <div className="w-full bg-gray-700 rounded-t-md relative" style={{height: '25%'}}>
                                                    <span className="absolute -top-6 text-sm text-gray-300 font-semibold">Baixa</span>
                                                </div>
                                                <p className="text-xs mt-2 text-gray-400">Manual</p>
                                            </div>
                                            <div className="flex-1 flex flex-col items-center justify-end relative">
                                                <div className="w-full bg-brand-violet rounded-t-md relative" style={{height: '90%'}}>
                                                    <span className="absolute -top-6 text-sm text-white font-semibold">Alta</span>
                                                </div>
                                                <p className="text-xs mt-2 text-gray-400">Ultra Foco</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center text-gray-400 text-sm">
                                            <p>Comparativo de tempo e esforço para atingir alta qualidade visual.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CtaFooterSection: React.FC = () => {
    return (
        <footer id="contact" className="bg-brand-indigo">
            <div className="container mx-auto px-6 py-16 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-montserrat font-extrabold">
                    Pronto para Integrar o Padrão Visual do Futuro?
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-indigo-200">
                    Vamos conversar sobre como a Ultra Foco pode se tornar o seu parceiro estratégico para o crescimento.
                </p>
                <a href="#" className="mt-8 inline-block bg-white text-brand-indigo hover:bg-gray-200 font-bold text-lg py-4 px-10 rounded-md transition-transform transform hover:scale-105 shadow-2xl">
                    Agendar Reunião de Parceria
                </a>
            </div>
            <div className="bg-indigo-700 py-4">
                <div className="container mx-auto px-6 text-center text-indigo-300 text-sm">
                    &copy; {new Date().getFullYear()} Ultra Foco Visual AI Solutions. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    return (
        <div className="bg-brand-gray-dark">
            <Header />
            <main>
                <HeroSection />
                <VisualProofSection />
                <SolutionsSection />
                <TechDetailSection />
            </main>
            <CtaFooterSection />
        </div>
    );
};

export default App;
