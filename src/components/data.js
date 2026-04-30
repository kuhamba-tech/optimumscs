import {
  MoneyIcon, TransportIcon, ChartIcon, CogIcon, SearchIcon, AnalyzeIcon, DesignIcon,
  ImplementIcon, OptimizeIcon, ClipboardIcon, TruckOutline, ScreenIcon, RouteIcon,
  CalendarMini, FilterMini, PinMini, BriefMini, MailMini, PhoneMini, LinkedinMini, XMini,
  FacebookMini, LocationMini
} from './Icons'

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Contact', to: '/contact' },
   { label: 'Request Quote', to: '/fee-quote' }
   
]

export const homeFeatureCards = [
  {
    title: 'TMS & Cost Optimization',
    description: 'Optimize routes, reduce logistics costs, and improve delivery reliability',
    icon: MoneyIcon,
    accent: 'green'
  },
  {
    title: 'Data\nAnaltyics',
    description: 'Real-time dashboards, predictive insights, and data-driven decision support',
    icon: TransportIcon,
    accent: 'blue'
  },
  {
    title: 'Warehouse Optimization',
    description: 'Increase efficiency and accuracy across warehouse operations',
    icon: ChartIcon,
    accent: 'blue'
  },
  {
    title: 'ERP\nTransformation',
    description: 'Integrate finance,operations and inventory into one unified system',
    icon: CogIcon,
    accent: 'green'
  }
]

export const approachSteps = [
  { label: 'Diagnose', icon: SearchIcon, accent: 'green' },
  { label: 'Analyze', icon: AnalyzeIcon, accent: 'blue' },
  { label: 'Design', icon: DesignIcon, accent: 'blue' },
  { label: 'Implement', icon: ImplementIcon, accent: 'slate' },
  { label: 'Optimize', icon: OptimizeIcon, accent: 'blue' }
]

export const industrySummaryCards = [
  {
    title: 'FMCG\nBeverage Manufacturing',
    metric: '20+',
    statLabel: 'Distribution Sites',
    points: ['ERP & Analytics Deployments', 'Operational costs down ~8-12%', '100+ staff trained'],
    accent: 'purple',
    icon: ClipboardIcon
  },
  {
    title: 'Logistics &\nTransportation',
    metric: '4,000+',
    statLabel: 'Deliveries / Month',
    points: ['Optimised via TMS', 'Route planning improved by ~10-15%', 'Delivery accuracy up by 8-12%'],
    accent: 'blue',
    icon: TruckOutline
  },
  {
    title: 'Supply Chain\nTechnology',
    metric: '10+',
    statLabel: 'Enterprise Systems',
    points: ['ERP, TMS & BI', 'Service delivery speed +10-14%', 'Order efficiency enhanced'],
    accent: 'orange',
    icon: ScreenIcon
  },
  {
    title: 'Healthcare & Medical\nDistribution',
    metric: '25+',
    statLabel: 'Facilities Supported',
    points: ['Planning & Visibility', 'Delivery accuracy up by 8-12%', 'Order efficiency enhanced'],
    accent: 'green',
    icon: RouteIcon
  }
]

export const trustedResultCards = [
  {
    title: 'Africa’s Largest\n Beverage Producer',
    problem: 'High delivery costs, stockouts & inaccurate demand planning',
    solution: 'Route optimization, demand forecasting & distribution planning',
    result: '9% down',
    resultLabel: '',
    accent: 'purple',
    icon: ClipboardIcon
  },
  {
    title: 'Enterprise Transport &\nLogistics Operator',
    problem: 'Inefficient routes, low delivery accuracy & high transport costs',
    solution: 'TMS optimization, route planning & real-time tracking',
    result: '11% up',
    resultLabel: 'Delivery Accuracy',
    accent: 'blue',
    icon: TruckOutline
  },
  {
    title: 'Supply Chain \nTechnology Provider',
    problem: 'Disconnected systems, manual processes & limited visibility',
    solution: 'ERP, TMS & BI integration for end-to-end visibility',
    result: '13% up',
    resultLabel: 'Service Delivery Speed',
    accent: 'orange',
    icon: ScreenIcon
  },
  {
    title: 'National Blood\n Organisation',
    problem: 'Complex distribution, visibility gaps & compliance challenges',
    solution: 'Planning & visibility tools, optimized delivery & tracking',
    result: '10% up',
    resultLabel: 'Delivery Accuracy',
    accent: 'green',
    icon: RouteIcon
  }
]

export const solutionsFilters = [
  { label: 'Today', icon: CalendarMini },
  { label: 'All Industries', icon: FilterMini },
  { label: 'All Regions', icon: PinMini },
  { label: 'All Services', icon: BriefMini }
]

export const solutionsStatCards = [
  {
    title: '',
    sub: 'Optimize routes, reduce fuel cost',
    value: '+9%',
    foot: '+4% last quarter',
    icon: MoneyIcon,
    accent: 'green'
  },
  {
    title: '',
    sub: 'On-Time Delivery\nRate',
    value: '89%',
    foot: '+6% last quarter',
    icon: TransportIcon,
    accent: 'blue'
  }
]

export const solutionPanels = [
  {
    heading: '',
    title: '',
    sub: 'Optimize routes, reduce fuel cost',
    result: '9% down',
    outcome: '6-12% savings',
    button: 'View Solution',
    icon: TransportIcon,
    accent: 'green'
  },
  {
    heading: 'Supply / Chain Analytics',
    title: '',
    sub: 'Real-time dashboards & insights',
    result: '+14%',
    outcome: 'Better decisions',
    button: 'View Solution',
    icon: ChartIcon,
    accent: 'blue'
  }
]

export const contactDetails = [
  { label: 'Our Office', value: '104 A Rabie Street Randburg, Gauteng, South Africa', icon: LocationMini },
  { label: 'Email', value: 'info@optimumscs.com', icon: MailMini },
  { label: 'Phone', value: '+27 73 937 0249', icon: PhoneMini },
  {
    label: 'LinkedIn',
    value: 'Optimum SCS',
    icon: LinkedinMini,
    url: 'https://www.linkedin.com/company/optimum-supply-chain-consulting/'
  },


  
  { label: 'Facebook', value: 'Optimum SCS', icon: FacebookMini },
  { label: 'X / Twitter', value: '@Optimum_SCS', icon: XMini }
]

