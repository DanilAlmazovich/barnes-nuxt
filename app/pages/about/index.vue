<script setup lang="ts">
import AnimateBlock from "~/components/AnimateBlock.vue";
</script>

<template>
  <div class="bg-neutral-50 min-h-screen">
    <div class="container mx-auto px-4 pt-6 md:pt-10">
      <AppBreadcrumbs :items="[{ label: 'About US' }]" />
    </div>

    <!-- Pinned Background Section -->
    <section class="relative min-h-[70vh] xs:min-h-[85vh] overflow-visible flex flex-col">
      <!-- Sticky Background Container -->
      <div class="sticky top-0 h-[70vh] xs:h-[85vh] w-full overflow-hidden z-0">
        <img class="w-full h-full object-cover scale-110 transition-transform duration-[2s]" src="@/assets/images/about-example.jpg" alt="About Us Background">
        <div class="absolute inset-0 bg-neutral-950/70 backdrop-blur-[1px]"></div>
      </div>

      <!-- Scrolling Content -->
      <div class="relative z-10 -mt-[70vh] xs:-mt-[85vh]">
        <div class="container mx-auto px-4 py-10 xs:py-12 md:py-16">
          <div class="w-full">
            <AnimateBlock :delay="100">
              <div class="mb-6">
                <img src="@/assets/images/about-logo.png" class="max-w-[100px] xs:max-w-[120px] md:max-w-[180px] drop-shadow-2xl" alt="Barnes Logo">
              </div>
            </AnimateBlock>

            <AnimateBlock :delay="300">
              <h1 class="text-white text-left text-xl xs:text-2xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-8">
                Our Story:<br>
                Born from Bravery,<br>
                <span class="text-primary">Built for Safety</span>
              </h1>
            </AnimateBlock>

            <div class="space-y-5 md:space-y-6 text-left border-l border-white/20 pl-4 xs:pl-6 md:pl-10">
              <AnimateBlock :delay="500">
                <p class="text-white text-sm xs:text-base md:text-lg leading-relaxed font-medium opacity-90">
                  The roots of our company stretch back to a time when courage wasn’t just a word—it was a way of life. My
                  grandfather, a lifelong firefighter, spent decades on the frontlines battling blazes, rescuing families, and
                  standing tall through the darkest hours of the night. He never saw it as a job. It was a calling. One that
                  demanded sacrifice, heart, and an unwavering commitment to protect.
                </p>
              </AnimateBlock>

              <AnimateBlock :delay="600">
                <p class="text-white text-sm xs:text-base md:text-lg leading-relaxed font-medium opacity-90">
                  After years of service, he retired early—but retirement didn’t mean slowing down. Instead, he found a new
                  mission. He saw firsthand how under-resourced many communities were—towns where fire departments lacked proper
                  gear, neighborhoods where homes had no smoke alarms, and schools that had never practiced a fire drill. He
                  began gathering equipment, donating supplies, and lending his knowledge to help places that needed it most.
                  From city centers to rural firehouses, he became known as the man who never stopped showing up when it
                  mattered.
                </p>
              </AnimateBlock>

              <AnimateBlock :delay="700">
                <p class="text-white text-sm xs:text-base md:text-lg leading-relaxed font-medium opacity-90">
                  Inspired by his legacy, we built this company with a simple goal: to carry his mission forward. Today, we’re
                  proud to specialize in fire safety equipment, firefighting tools, and emergency support solutions. But more
                  than that, we’re here to serve. To protect. To ensure that every firefighter has what they need, and every
                  family has the tools to stay safe.
                </p>
              </AnimateBlock>

              <AnimateBlock :delay="800">
                <div class="pt-4">
                    <p class="text-white text-base xs:text-lg md:text-xl leading-relaxed font-bold italic border-primary border-l-4 pl-4 xs:pl-6">
                        "This isn’t just business for us—it’s personal. It’s a promise to continue the work my grandfather started,
                        and to honor every brave soul who runs toward the fire when others run away."
                    </p>
                </div>
              </AnimateBlock>
            </div>
          </div>
        </div>
        
        <!-- CTA Section attached at the bottom of the scroll -->
        <div class="bg-neutral-50 relative z-20">
            <AnimateBlock :delay="200">
                <HomeCTA class="py-24"/>
            </AnimateBlock>
        </div>
      </div>
    </section>
  </div>
</template>
