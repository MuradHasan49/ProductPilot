"use client";

import React, { useState } from 'react';
import { Check, X, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: 'Starter',
      description: 'Perfect for individuals exploring AI generation.',
      priceMonthly: 'Free',
      priceAnnual: 'Free',
      buttonText: 'Get Started',
      buttonVariant: 'secondary',
      popular: false,
      features: [
        { name: '1 Workspace', included: true },
        { name: '3 AI Projects per month', included: true },
        { name: 'Basic Export (PDF/MD)', included: true },
        { name: 'Community Support', included: true },
        { name: 'Custom AI Models', included: false },
        { name: 'Team Collaboration', included: false },
      ],
      icon: Sparkles,
      color: 'text-gray-400',
    },
    {
      name: 'Pro',
      description: 'For professionals building serious products.',
      priceMonthly: '$29',
      priceAnnual: '$24',
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary',
      popular: true,
      features: [
        { name: 'Unlimited Workspaces', included: true },
        { name: 'Unlimited AI Projects', included: true },
        { name: 'Groq Llama 3 70B Access', included: true },
        { name: 'Priority Support (24/7)', included: true },
        { name: 'Custom AI Models', included: false },
        { name: 'Team Collaboration', included: true },
      ],
      icon: Zap,
      color: 'text-blue-400',
    },
    {
      name: 'Enterprise',
      description: 'For large teams requiring ultimate control.',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      popular: false,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Custom Model Fine-tuning', included: true },
        { name: 'Advanced SSO Security', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'Custom SLAs', included: true },
        { name: 'On-premise Deployment', included: true },
      ],
      icon: Shield,
      color: 'text-purple-400',
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-32 selection:bg-blue-500/30">
      {/* Abstract Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none blur-[100px] bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none blur-[120px] bg-emerald-600 rounded-full" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge>Pricing Plans</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mt-6 mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Unleash the power of AI to build products faster. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f1117]"
          >
            <span 
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${isAnnual ? 'translate-x-7' : 'translate-x-1'}`} 
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>Annually</span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div 
                key={tier.name}
                className={`relative flex flex-col rounded-3xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] ${
                  tier.popular 
                    ? 'border-2 border-blue-500 bg-[#1e2330]/80 shadow-2xl scale-105 z-10' 
                    : 'border border-white/10 bg-[#1e2330]/40'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 pb-6 flex-grow flex flex-col">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner ${tier.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-400 min-h-[40px] mb-6">
                    {tier.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-8 flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {isAnnual ? tier.priceAnnual : tier.priceMonthly}
                    </span>
                    {tier.priceMonthly !== 'Free' && tier.priceMonthly !== 'Custom' && (
                      <span className="text-gray-400 text-sm font-medium mb-1">/month</span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="flex-grow space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-blue-400" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 opacity-30">
                            <X className="w-4 h-4 text-gray-500" strokeWidth={2} />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href="/register" className="mt-auto block">
                    <button 
                      className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        tier.popular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 border border-blue-500/50'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {tier.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise/Custom Trust Banner */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.02] to-white/[0.05] backdrop-blur-xl max-w-4xl mx-auto">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">Need a custom solution?</h3>
            <p className="text-gray-400">We offer custom SLAs, on-premise deployments, and volume discounts.</p>
          </div>
          <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 whitespace-nowrap">
            Contact Enterprise Sales
          </button>
        </div>

      </div>
    </div>
  );
}

// Reusable mini badge component for the header
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-4 backdrop-blur-sm">
      <span className="text-sm font-semibold tracking-wide text-blue-400 uppercase">
        {children}
      </span>
    </div>
  );
}
