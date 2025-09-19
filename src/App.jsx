import { useState } from 'react'
import { Search, ArrowLeft, ExternalLink, Brain, Zap, Users, Sparkles, MessageSquare, Image, Video, BarChart3, Languages, Code } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import './App.css'

// Importar dados das ferramentas
import toolsData from '../tools.json'

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
      const results = toolsData.categories[query.toLowerCase()]
      setSearchResults(results || null)
      setIsSearching(false)
    }, 500)
  }

  const handleBackToHome = () => {
    setSearchResults(null)
    setSearchQuery('')
  }

  if (searchResults) {
    const IconComponent = searchResults.icon ? iconMap[searchResults.icon] : null;
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
              {IconComponent && <IconComponent className="w-8 h-8 text-yellow-400" />}
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