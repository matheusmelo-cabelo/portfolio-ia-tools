import { useState } from 'react'
import { Search, ArrowLeft, ExternalLink, Brain, Zap, Users, Sparkles, MessageSquare, Image, Video, BarChart3, Languages, Code } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import './App.css'

// Importar dados das ferramentas (simulando import JSON)
import toolsData from './data/tools.json'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mapeamento de ícones
  const iconMap = {
    Users,
    MessageSquare,
    Image,
    Video,
    BarChart3,
    Languages,
    Code
  }

  // Dados das ferramentas organizadas por categoria com curadoria do Matheus
  const categories = {
    'criação de personagens': {
      title: 'Criação De Personagens Consistentes',
      description: 'Ferramentas especializadas para criar personagens únicos e consistentes',
      icon: Users,
      tools: [
        {
          name: 'Artbreeder',
          description: 'Plataforma que utiliza redes generativas adversariais (GANs) para criar e misturar imagens, ideal para gerar personagens com características consistentes.',
          url: 'https://artbreeder.com',
          gradient: 'from-purple-500 to-pink-500'
        },
        {
          name: 'Character Creator 4',
          description: 'Software completo para criação de personagens 3D, com ferramentas de IA para geração de texturas e animações, permitindo consistência visual.',
          url: 'https://www.reallusion.com/character-creator/',
          gradient: 'from-blue-500 to-cyan-500'
        },
        {
          name: 'Midjourney',
          description: 'Ferramenta de geração de imagens por IA que permite criar personagens consistentes usando referências e prompts específicos.',
          url: 'https://midjourney.com',
          gradient: 'from-purple-600 to-blue-600'
        },
        {
          name: 'Stable Diffusion',
          description: 'Modelo de IA open-source para geração de imagens que pode ser treinado para manter consistência de personagens.',
          url: 'https://stability.ai',
          gradient: 'from-green-500 to-emerald-500'
        }
      ]
    },
    'geração de texto': {
      title: 'Assistentes de Escrita Inteligente',
      description: 'Ferramentas avançadas para criação de conteúdo textual e conversação',
      icon: MessageSquare,
      tools: [
        {
          name: 'ChatGPT',
          description: 'Modelo de linguagem avançado para conversação e geração de texto em diversos contextos.',
          url: 'https://chat.openai.com',
          gradient: 'from-green-500 to-teal-500'
        },
        {
          name: 'Claude',
          description: 'Assistente de IA focado em conversas úteis, harmless e honestas para diversas tarefas.',
          url: 'https://claude.ai',
          gradient: 'from-orange-500 to-red-500'
        },
        {
          name: 'Gemini',
          description: 'Modelo multimodal do Google para geração de texto e análise de conteúdo.',
          url: 'https://gemini.google.com',
          gradient: 'from-blue-500 to-purple-500'
        },
        {
          name: 'Manus',
          description: 'Agente de IA autônomo para tarefas complexas, criação de conteúdo e automação de processos.',
          url: 'https://manus.im',
          gradient: 'from-yellow-500 to-orange-500',
          featured: true
        }
      ]
    },
    'edição de imagens': {
      title: 'Criação e Edição Visual',
      description: 'Ferramentas para editar, melhorar e criar imagens com IA',
      icon: Image,
      tools: [
        {
          name: 'DALL-E 3',
          description: 'Gerador de imagens da OpenAI com alta qualidade e precisão nos prompts.',
          url: 'https://openai.com/dall-e-3',
          gradient: 'from-purple-500 to-pink-500'
        },
        {
          name: 'Canva AI',
          description: 'Ferramentas de design com IA integradas para criação rápida de conteúdo visual.',
          url: 'https://canva.com',
          gradient: 'from-blue-500 to-cyan-500'
        },
        {
          name: 'Photoshop AI',
          description: 'Recursos de IA integrados ao Photoshop para edição avançada de imagens.',
          url: 'https://adobe.com/photoshop',
          gradient: 'from-indigo-500 to-purple-500'
        },
        {
          name: 'LoveArt',
          description: 'Plataforma especializada em criação de arte digital e designs únicos com IA.',
          url: 'https://loveart.ai',
          gradient: 'from-pink-500 to-rose-500'
        }
      ]
    },
    'criação de vídeos': {
      title: 'Produção de Vídeo com IA',
      description: 'Ferramentas para criar e editar vídeos usando inteligência artificial',
      icon: Video,
      tools: [
        {
          name: 'Runway ML',
          description: 'Plataforma completa para criação de vídeos com IA, incluindo geração e edição.',
          url: 'https://runwayml.com',
          gradient: 'from-green-500 to-blue-500'
        },
        {
          name: 'Pika Labs',
          description: 'Ferramenta de geração de vídeos curtos a partir de texto e imagens.',
          url: 'https://pika.art',
          gradient: 'from-purple-500 to-indigo-500'
        },
        {
          name: 'Synthesia',
          description: 'Criação de vídeos com avatares virtuais falando em múltiplos idiomas.',
          url: 'https://synthesia.io',
          gradient: 'from-orange-500 to-red-500'
        },
        {
          name: 'Luma AI',
          description: 'Ferramenta para criação de vídeos 3D e captura de realidade com IA.',
          url: 'https://lumalabs.ai',
          gradient: 'from-cyan-500 to-blue-500'
        }
      ]
    },
    'análise de dados': {
      title: 'Análise Inteligente de Dados',
      description: 'Ferramentas para processar, analisar e visualizar dados com IA',
      icon: BarChart3,
      tools: [
        {
          name: 'Julius AI',
          description: 'Assistente de IA para análise de dados e criação de visualizações.',
          url: 'https://julius.ai',
          gradient: 'from-blue-500 to-teal-500'
        },
        {
          name: 'DataRobot',
          description: 'Plataforma de machine learning automatizado para análise preditiva.',
          url: 'https://datarobot.com',
          gradient: 'from-indigo-500 to-blue-500'
        },
        {
          name: 'Tableau AI',
          description: 'Recursos de IA integrados ao Tableau para análise avançada de dados.',
          url: 'https://tableau.com',
          gradient: 'from-cyan-500 to-blue-500'
        },
        {
          name: 'Gamma',
          description: 'Ferramenta para criação de apresentações e análises visuais com IA.',
          url: 'https://gamma.app',
          gradient: 'from-purple-500 to-pink-500'
        }
      ]
    },
    'tradução automática': {
      title: 'Tradução e Comunicação Global',
      description: 'Ferramentas para tradução e comunicação em múltiplos idiomas',
      icon: Languages,
      tools: [
        {
          name: 'DeepL',
          description: 'Tradutor com IA que oferece traduções mais naturais e precisas.',
          url: 'https://deepl.com',
          gradient: 'from-blue-600 to-indigo-600'
        },
        {
          name: 'Google Translate',
          description: 'Serviço de tradução do Google com suporte a mais de 100 idiomas.',
          url: 'https://translate.google.com',
          gradient: 'from-green-500 to-blue-500'
        },
        {
          name: 'Reverso',
          description: 'Plataforma de tradução com contexto e exemplos de uso.',
          url: 'https://reverso.net',
          gradient: 'from-orange-500 to-yellow-500'
        }
      ]
    },
    'desenvolvimento web': {
      title: 'Desenvolvimento Web e Apps',
      description: 'Ferramentas para criar sites e aplicações com IA',
      icon: Code,
      tools: [
        {
          name: 'Lovable',
          description: 'Plataforma para criação de aplicações web completas usando IA.',
          url: 'https://lovable.dev',
          gradient: 'from-pink-500 to-purple-500'
        },
        {
          name: 'Firebase',
          description: 'Plataforma do Google para desenvolvimento de apps com recursos de IA.',
          url: 'https://firebase.google.com',
          gradient: 'from-yellow-500 to-orange-500'
        },
        {
          name: 'Vercel AI',
          description: 'Ferramentas de IA para desenvolvimento e deploy de aplicações web.',
          url: 'https://vercel.com/ai',
          gradient: 'from-black to-gray-600'
        }
      ]
    }
  }

  // Categorias mais intuitivas para leigos
  const intuitiveCategories = [
    {
      title: 'Preciso de ajuda para escrever',
      subtitle: 'Textos, e-mails, artigos, roteiros',
      icon: MessageSquare,
      searchTerm: 'geração de texto',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Quero criar imagens',
      subtitle: 'Logos, ilustrações, fotos, arte',
      icon: Image,
      searchTerm: 'edição de imagens',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Preciso fazer vídeos',
      subtitle: 'Apresentações, marketing, tutoriais',
      icon: Video,
      searchTerm: 'criação de vídeos',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      title: 'Quero analisar dados',
      subtitle: 'Planilhas, gráficos, relatórios',
      icon: BarChart3,
      searchTerm: 'análise de dados',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Preciso traduzir textos',
      subtitle: 'Documentos, sites, conversas',
      icon: Languages,
      searchTerm: 'tradução automática',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Quero criar personagens',
      subtitle: 'Avatares, ilustrações, jogos',
      icon: Users,
      searchTerm: 'criação de personagens',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Preciso criar um site',
      subtitle: 'Landing pages, e-commerce, apps',
      icon: Code,
      searchTerm: 'desenvolvimento web',
      gradient: 'from-green-500 to-teal-500'
    }
  ]

  const popularSearches = [
    'criação de personagens',
    'geração de texto', 
    'edição de imagens',
    'criação de vídeos',
    'análise de dados',
    'tradução automática',
    'desenvolvimento web'
  ]

  const handleSearch = (query) => {
    setIsSearching(true)
    setSearchQuery(query)
    
    // Simular busca
    setTimeout(() => {
      const results = categories[query.toLowerCase()]
      setSearchResults(results || null)
      setIsSearching(false)
    }, 500)
  }

  const handleBackToHome = () => {
    setSearchResults(null)
    setSearchQuery('')
  }

  if (searchResults) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackToHome}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">Matheus Melo</span>
              </div>
            </div>
          </div>
        </header>

        {/* Search Results */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8 animate-in fade-in duration-500">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Resultados para "{searchQuery}" 
              <span className="text-gray-400 text-lg ml-2">
                ({searchResults.tools.length} {searchResults.tools.length === 1 ? 'resultado' : 'resultados'})
              </span>
            </h1>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border-l-4 border-yellow-400 animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-3 mb-4">
              {searchResults.icon && <searchResults.icon className="w-8 h-8 text-yellow-400" />}
              <h2 className="text-2xl font-bold text-yellow-400">{searchResults.title}</h2>
            </div>
            <p className="text-gray-300 mb-6 text-lg">{searchResults.description}</p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {searchResults.tools.map((tool, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-800/50 rounded-xl p-6 border transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom duration-500 ${
                    tool.featured 
                      ? 'border-yellow-400 bg-yellow-400/5' 
                      : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/70'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                      {tool.featured && (
                        <div className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                          RECOMENDADO
                        </div>
                      )}
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${tool.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{tool.description}</p>
                  <Button 
                    className={`w-full bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg`}
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    Acessar Ferramenta
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Curadoria Note */}
            <div className="mt-8 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-400">Curadoria Especializada</span>
              </div>
              <p className="text-gray-300 text-sm">
                Estas ferramentas foram cuidadosamente selecionadas por Matheus Melo, 
                especialista em IA e tecnologias emergentes, com base em experiência prática 
                e resultados comprovados.
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">Matheus Melo</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Encontre as <span className="text-yellow-400">Melhores</span>
            <br />
            <span className="text-yellow-400">Ferramentas de IA</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Descubra as ferramentas de inteligência artificial perfeitas para suas necessidades. 
            Digite o que você quer fazer e encontre as melhores soluções disponíveis.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-yellow-400">
              <Brain className="w-5 h-5" />
              <span className="font-medium">Inteligência Artificial</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Tecnologias Emergentes</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Users className="w-5 h-5" />
              <span className="font-medium">Impacto Social</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom duration-1000 delay-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Ex: criar personagens consistentes, gerar texto, editar imagens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchQuery && handleSearch(searchQuery)}
              className="pl-12 pr-4 py-4 text-lg bg-gray-900/50 border-gray-700 focus:border-yellow-400 focus:ring-yellow-400/20 rounded-lg transition-all duration-300"
            />
            {searchQuery && (
              <Button 
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition-all duration-300"
                disabled={isSearching}
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            )}
          </div>
        </div>

        {/* Intuitive Categories */}
        <div className="mb-16 animate-in slide-in-from-bottom duration-1000 delay-500">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-yellow-400">
            O que você precisa fazer?
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {intuitiveCategories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSearch(category.searchTerm)}
                className={`h-auto p-6 bg-gray-900/30 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 text-left transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom duration-500`}
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.gradient} flex-shrink-0`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-400">{category.subtitle}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-1000 delay-700">
          <p className="text-gray-400 mb-4">Ou explore as pesquisas populares:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSearch(search)}
                className="bg-gray-900/50 border-gray-700 hover:border-yellow-400 hover:bg-yellow-400/10 text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 50 + 800}ms` }}
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-800 text-center animate-in slide-in-from-bottom duration-1000 delay-900">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Curadoria Especializada</h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Todas as ferramentas são cuidadosamente selecionadas por Matheus Melo, 
            especialista em IA e tecnologias emergentes. Encontre soluções testadas 
            e aprovadas por quem realmente entende do assunto.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p>© 2024 Matheus Melo. Especialista em Blockchain, IA & Tecnologias Emergentes.</p>
            <p className="mt-2 text-sm">🧠 🛸 🤝 Bitcoin • Inteligência Artificial • Impacto Social</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

