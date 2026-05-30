export interface Formula {
  name: string
  formula: string
  variables: string
}

export interface FormulaSection {
  id: string
  title: string
  formulas: Formula[]
}

export const FORMULA_SECTIONS: FormulaSection[] = [
  {
    id: 'forwards',
    title: 'Forwards, Futures & Swaps',
    formulas: [
      { name: 'Forward Price (no dividends)', formula: 'F₀ = S₀ · e^(rT)', variables: 'S₀ = spot price, r = risk-free rate, T = time to maturity' },
      { name: 'Forward Price (continuous dividend)', formula: 'F₀ = S₀ · e^((r−q)T)', variables: 'q = continuous dividend yield' },
      { name: 'Forward Price (discrete dividend)', formula: 'F₀ = (S₀ − I) · e^(rT)', variables: 'I = PV of dividends paid during life of forward' },
      { name: 'Value of Long Forward', formula: 'f = (F₀ − K) · e^(−rT)', variables: 'K = delivery price, F₀ = current forward price' },
      { name: 'Cost of Carry', formula: 'F₀ = S₀ · e^((r+u−q)T)', variables: 'u = storage cost rate, q = convenience yield' },
    ],
  },
  {
    id: 'options',
    title: 'Options & Black-Scholes',
    formulas: [
      { name: 'Black-Scholes Call', formula: 'C = S·N(d₁) − K·e^(−rT)·N(d₂)', variables: 'S = stock price, K = strike, r = risk-free rate, T = time, N = standard normal CDF' },
      { name: 'Black-Scholes Put', formula: 'P = K·e^(−rT)·N(−d₂) − S·N(−d₁)', variables: 'Same inputs as call' },
      { name: 'd₁', formula: 'd₁ = [ln(S/K) + (r + σ²/2)·T] / (σ√T)', variables: 'σ = volatility (annualised std dev of returns)' },
      { name: 'd₂', formula: 'd₂ = d₁ − σ√T', variables: 'Note: d₂ = [ln(S/K) + (r − σ²/2)·T] / (σ√T)' },
      { name: 'Binomial Risk-Neutral Prob', formula: 'p = (e^(rΔt) − d) / (u − d)', variables: 'u = up factor, d = down factor, Δt = time step' },
      { name: 'Binomial: no-arbitrage', formula: 'd < e^(rΔt) < u', variables: 'Required for no-arbitrage in binomial model' },
    ],
  },
  {
    id: 'putcall',
    title: 'Put-Call Parity',
    formulas: [
      { name: 'Put-Call Parity (European)', formula: 'C − P = S₀ − K·e^(−rT)', variables: 'C = call price, P = put price, S₀ = spot, K = strike' },
      { name: 'Put-Call Parity (discrete)', formula: 'C − P = S₀ − PV(K)', variables: 'PV(K) = K/(1+r)^T for discrete discounting' },
      { name: 'Synthetic Forward via Options', formula: 'Long call + Short put = Long forward', variables: 'Same strike K and maturity T' },
    ],
  },
  {
    id: 'capital-structure',
    title: 'Capital Structure & MM Theorem',
    formulas: [
      { name: 'MM Prop I (no tax)', formula: 'V_L = V_U', variables: 'V_L = levered firm value, V_U = unlevered firm value' },
      { name: 'MM Prop I (with corp tax)', formula: 'V_L = V_U + T_c · D', variables: 'T_c = corporate tax rate, D = market value of debt' },
      { name: 'MM Prop II (no tax)', formula: 'r_E = r_A + (D/E)(r_A − r_D)', variables: 'r_E = cost of equity, r_A = asset return, r_D = cost of debt' },
      { name: 'MM Prop II (with tax)', formula: 'r_E = r_A + (D/E)(r_A − r_D)(1 − T_c)', variables: 'Same as above with tax adjustment' },
      { name: 'Levered Beta', formula: 'β_L = β_U · [1 + (D/E)(1 − T_c)]', variables: 'β_L = levered equity beta, β_U = unlevered (asset) beta' },
      { name: 'Unlevered Beta', formula: 'β_U = β_L / [1 + (D/E)(1 − T_c)]', variables: 'Used to strip out financial leverage from observed β' },
    ],
  },
  {
    id: 'wacc',
    title: 'WACC & Financing',
    formulas: [
      { name: 'WACC', formula: 'WACC = (E/V)·r_E + (D/V)·r_D·(1 − T_c)', variables: 'E = equity value, D = debt value, V = E + D' },
      { name: 'After-tax Cost of Debt', formula: 'r_D(1 − T_c)', variables: 'Interest is tax-deductible — shields T_c · r_D · D of tax' },
      { name: 'Equity Value (levered firm)', formula: 'E = V_L − D', variables: 'After accounting for tax shield: E = V_U + T_c·D − D' },
    ],
  },
  {
    id: 'capm',
    title: 'CAPM & Risk',
    formulas: [
      { name: 'CAPM', formula: 'E(r_i) = r_f + β_i · [E(r_m) − r_f]', variables: 'r_f = risk-free rate, β_i = systematic risk, E(r_m) = expected market return' },
      { name: 'Beta', formula: 'β_i = Cov(r_i, r_m) / Var(r_m)', variables: 'β > 1 = more volatile than market, β < 1 = less volatile' },
      { name: 'Market Risk Premium', formula: 'MRP = E(r_m) − r_f', variables: 'Typically 5–8% historically in developed markets' },
    ],
  },
  {
    id: 'npv',
    title: 'Capital Budgeting & NPV',
    formulas: [
      { name: 'Net Present Value', formula: 'NPV = Σ [CF_t / (1+r)^t] − I₀', variables: 'CF_t = cash flow at time t, r = discount rate, I₀ = initial investment' },
      { name: 'Risk-Adjusted Discount Rate', formula: 'r = r_f + β · MRP', variables: 'Use project beta (not firm beta) if project risk differs' },
      { name: 'Certainty-Equivalent NPV', formula: 'NPV = Σ [α_t · CF_t / (1+r_f)^t] − I₀', variables: 'α_t = certainty-equivalent coefficient (0 < α ≤ 1), r_f = risk-free rate' },
      { name: 'Certainty-Equiv Coefficient', formula: 'α_t = [E(CF_t) − λ·Cov(CF_t, r_m)] / E(CF_t)', variables: 'λ = market price of risk = [E(r_m)−r_f] / Var(r_m)' },
      { name: 'Equivalence', formula: 'RADR approach ⟺ CE approach (same NPV)', variables: 'Both methods are consistent if applied correctly' },
    ],
  },
  {
    id: 'risk-neutral',
    title: 'Risk-Neutral Pricing',
    formulas: [
      { name: 'Risk-Neutral Valuation', formula: 'V₀ = e^(−rT) · E^Q[V_T]', variables: 'E^Q = expectation under risk-neutral (Q) measure, not real-world (P)' },
      { name: 'Risk-Neutral Pricing (binomial)', formula: 'f = e^(−rΔt) · [p·f_u + (1−p)·f_d]', variables: 'f_u, f_d = payoffs in up/down states, p = risk-neutral probability' },
      { name: 'No-Arbitrage Condition', formula: 'S₀ = e^(−rT) · E^Q[S_T]', variables: 'Stock price equals discounted expected value under Q measure' },
    ],
  },
]
