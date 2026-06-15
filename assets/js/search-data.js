// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "news-starting-a-ph-d-in-computer-science-at-sapienza-university-of-rome",
          title: 'Starting a Ph.D. in Computer Science at Sapienza University of Rome!',
          description: "",
          section: "News",},{id: "news-the-official-website-of-hercole-lab-is-now-online-explore-our-research-and-updates",
          title: 'The official website of HERCOLE Lab is now online. Explore our research and...',
          description: "",
          section: "News",},{id: "news-new-preprint-we-present-nabla-cmh-a-method-for-community-membership-hiding-in-networks-ensuring-privacy-while-preserving-structural-insights",
          title: 'New Preprint! We present $\nabla$-CMH, a method for community membership hiding in networks,...',
          description: "",
          section: "News",},{id: "news-my-latest-work-enhancing-xai-narratives-through-multi-narrative-refinement-and-knowledge-distillation-has-been-accepted-to-the-cikm-2025-workshop-human-centric-ai-from-explainability-and-trustworthiness-to-actionable-ethics-see-you-in-korea",
          title: 'My latest work “Enhancing XAI Narratives through Multi-Narrative Refinement and Knowledge Distillation” has...',
          description: "",
          section: "News",},{id: "news-check-out-my-first-publication-exploring-the-potential-of-artificial-intelligence-in-assessing-the-risk-of-gastric-neoplastic-lesions-in-patients-with-corpus-atrophic-gastritis-to-the-gastric-cancer-journal",
          title: 'Check out my first publication Exploring the potential of artificial intelligence in assessing...',
          description: "",
          section: "News",},{id: "news-curios-about-xai-narratives-take-a-look-to-our-recent-survey-we-review-state-of-the-art-methods-and-we-design-a-comprehensive-evaluation-framework-for-this-topic",
          title: 'Curios about XAI Narratives? Take a look to our recent Survey! We review...',
          description: "",
          section: "News",},{id: "news-happy-to-share-that-we-receive-the-best-paper-award-at-the-hcai-workshop",
          title: 'Happy to share that we receive the Best Paper Award at the HCAI...',
          description: "",
          section: "News",},{id: "news-a-new-milestone-our-latest-work-ponte-personalized-orchestration-for-natural-language-trustworthy-explanations-has-been-accepted-at-the-4th-xai-world-conference-brasil-we-re-coming",
          title: 'A new milestone! Our latest work PONTE: Personalized Orchestration for Natural Language Trustworthy...',
          description: "",
          section: "News",},{id: "news-i-started-a-research-traineeship-at-the-european-molecular-biology-laboratory-focusing-on-ai-agents-for-scientific-discovery",
          title: 'I started a Research Traineeship at the European Molecular Biology Laboratory, focusing on...',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
