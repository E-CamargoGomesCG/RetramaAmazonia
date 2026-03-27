<script setup lang="ts">
import { ref } from 'vue'

interface TeamMember {
  name: string
  role: string
  initials: string
}

const teamMembers = ref<TeamMember[]>([
  { name: 'Ainat Militão', role: 'CEO & Fundadora', initials: 'AM' },
  { name: 'Eduardo Camargo Gomes', role: 'CTO', initials: 'EC' },
  { name: 'Felipe Souza', role: 'Diretor de Operações', initials: 'FS' },
  { name: 'Gabriel Colares', role: 'Diretor de Marketing', initials: 'GC' },
  { name: 'Glicia Caauper', role: 'Diretora de Sustentabilidade', initials: 'GC' },
  { name: 'Valentina Araujo', role: 'Diretora de Design', initials: 'VA' },
])

const values = [
  {
    title: 'Economia Circular',
    description: 'Transformamos resíduos têxteis em novos produtos, fechando o ciclo de vida dos materiais e reduzindo o impacto ambiental.',
    icon: 'recycle',
  },
  {
    title: 'Raízes Amazônicas',
    description: 'Valorizamos a cultura e os saberes tradicionais da região amazônica, integrando-os em cada peça que criamos.',
    icon: 'leaf',
  },
  {
    title: 'Inovação Sustentável',
    description: 'Utilizamos tecnologia e criatividade para desenvolver soluções que beneficiam o meio ambiente e a comunidade.',
    icon: 'lightbulb',
  },
]

const whatsappNumber = '5592981548457'
const whatsappLink = `https://wa.me/${whatsappNumber}`
</script>

<template>
  <main class="animate-in fade-in duration-500">
    <!-- Hero Section -->
    <section class="bg-background py-12 md:py-20 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance">
              Nossa História: Do Hackathon Aihhuam para o Mundo
            </h1>
            <p class="mt-6 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
              A Retrama nasceu de uma ideia ousada: combater o desperdício têxtil na Amazônia e transformar 
              resíduos em oportunidades. Fundada durante o Hackathon Aihhuam, nossa missão é criar um futuro 
              mais sustentável, valorizando a cultura amazônica e promovendo a economia circular.
            </p>
            <p class="mt-4 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
              Acreditamos que cada peça de tecido descartada pode ganhar uma nova vida. Por isso, trabalhamos 
              com comunidades locais, artesãos e parceiros comprometidos com a transformação socioambiental.
            </p>
          </div>

          <!-- Hero Image -->
          <div class="flex-1 w-full lg:w-auto">
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=500&fit=crop"
                alt="Tecidos sustentáveis da Amazônia"
                class="w-full h-64 md:h-80 lg:h-[400px] object-cover rounded-3xl shadow-card"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="bg-surface py-12 md:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-balance">
            Nossos Valores
          </h2>
          <p class="mt-4 text-text-secondary max-w-2xl mx-auto text-pretty">
            Princípios que guiam cada decisão e ação da Retrama Amazônia
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <article
            v-for="value in values"
            :key="value.title"
            class="bg-background p-6 md:p-8 rounded-2xl shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <!-- Icon -->
            <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <!-- Recycle Icon -->
              <svg
                v-if="value.icon === 'recycle'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <!-- Leaf Icon -->
              <svg
                v-else-if="value.icon === 'leaf'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <!-- Lightbulb Icon -->
              <svg
                v-else-if="value.icon === 'lightbulb'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <h3 class="text-xl font-semibold text-text-primary mb-3">
              {{ value.title }}
            </h3>
            <p class="text-text-secondary leading-relaxed text-pretty">
              {{ value.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="bg-background py-12 md:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-balance">
            Nossa Equipe
          </h2>
          <p class="mt-4 text-text-secondary max-w-2xl mx-auto text-pretty">
            Conheça as pessoas por trás da Retrama Amazônia
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          <article
            v-for="member in teamMembers"
            :key="member.name"
            class="flex flex-col items-center text-center group"
          >
            <!-- Avatar -->
            <div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-card">
              <span class="text-white text-xl md:text-2xl font-bold">
                {{ member.initials }}
              </span>
            </div>
            <h3 class="text-sm md:text-base font-semibold text-text-primary">
              {{ member.name }}
            </h3>
            <p class="text-xs md:text-sm text-text-secondary mt-1">
              {{ member.role }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact Banner -->
    <section class="bg-gradient-to-r from-primary to-primary/90 py-12 md:py-16 lg:py-20">
      <div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-balance">
          Vamos Construir um Futuro Sustentável Juntos?
        </h2>
        <p class="mt-4 text-white/90 text-base md:text-lg max-w-2xl mx-auto text-pretty">
          Entre em contato conosco para saber mais sobre nossos produtos, parcerias ou como fazer parte dessa transformação.
        </p>
        <a
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-lg min-h-12"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Fale Conosco pelo WhatsApp
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.animate-in {
  animation: animateIn 0.5s ease-out;
}

@keyframes animateIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
