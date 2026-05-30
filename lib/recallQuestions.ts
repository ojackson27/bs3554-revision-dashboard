export interface RecallQuestion {
  question: string
  answer: string
}

export const RECALL_QUESTIONS: Record<string, RecallQuestion[]> = {
  'risk-neutral': [
    {
      question: 'What is the risk-neutral measure and why can we use it to price derivatives?',
      answer: 'The risk-neutral measure Q is a probability measure under which all assets earn the risk-free rate. We can use it because no-arbitrage guarantees a unique pricing measure exists. We price by: V₀ = e^(−rT) · E^Q[V_T]. The actual probabilities don\'t matter — only the no-arbitrage condition does.',
    },
    {
      question: 'Derive the risk-neutral probability p in the binomial model.',
      answer: 'At t=0: S₀ = e^(−rΔt)[p·S₀u + (1−p)·S₀d]. Solving: p = (e^(rΔt) − d)/(u − d). For no-arbitrage we need d < e^(rΔt) < u. The risk-neutral probability p is NOT the real-world probability of an up move.',
    },
    {
      question: 'What is the difference between the P-measure and the Q-measure?',
      answer: 'P is the real-world probability measure — reflects actual likelihoods. Q is the risk-neutral measure — adjusted so all assets earn r_f. Under P, risky assets earn a risk premium. Under Q, they don\'t. We use Q for pricing (not P) because risk preferences cancel out.',
    },
    {
      question: 'How do you value a 2-step binomial option?',
      answer: 'Work backwards: (1) Compute payoffs at each terminal node. (2) At each intermediate node, apply: f = e^(−rΔt)[p·f_u + (1−p)·f_d]. (3) Repeat back to t=0. Show all tree values and p calculation for full marks.',
    },
  ],
  'forwards-futures': [
    {
      question: 'Derive the no-arbitrage forward price for a non-dividend paying stock.',
      answer: 'Strategy: Buy spot at S₀, borrow S₀ at rate r. At T: repay S₀e^(rT), deliver stock, receive F₀. No-arbitrage: F₀ = S₀e^(rT). If F₀ > S₀e^(rT): sell forward, buy spot (cash-and-carry). If F₀ < S₀e^(rT): buy forward, short spot (reverse cash-and-carry).',
    },
    {
      question: 'What is the difference between a forward price and the value of a forward contract?',
      answer: 'Forward price F₀ is the delivery price that makes the contract worth zero at inception. Value of an existing forward with delivery price K is: f = (F₀ − K)e^(−rT). At inception K = F₀ so f = 0. As F₀ changes over time, f becomes non-zero.',
    },
    {
      question: 'How does a dividend affect the forward price? Why?',
      answer: 'F₀ = (S₀ − I)e^(rT) where I = PV of dividends. Dividends reduce the cost of carrying the position — you receive income while holding the stock. So the forward price is lower. Alternatively: F₀ = S₀e^((r−q)T) for continuous dividend yield q.',
    },
    {
      question: 'Explain how an interest rate swap works. Who gains?',
      answer: 'Two parties exchange cash flows: one pays fixed, one pays floating (e.g. LIBOR). A firm with floating-rate debt wanting certainty swaps into fixed. Value at inception = 0. A swap is equivalent to a portfolio of FRAs. Both sides gain if one has comparative advantage in one market.',
    },
  ],
  'options': [
    {
      question: 'State the Black-Scholes formula and its 5 inputs.',
      answer: 'C = S·N(d₁) − Ke^(−rT)·N(d₂). Inputs: S (stock price), K (strike), r (risk-free rate), T (time to expiry), σ (volatility). d₁ = [ln(S/K) + (r + σ²/2)T] / σ√T. d₂ = d₁ − σ√T. N(·) is the standard normal CDF.',
    },
    {
      question: 'How does each input affect call and put prices? (The Greeks intuition)',
      answer: 'S↑: call↑ put↓. K↑: call↓ put↑. r↑: call↑ put↓ (PV of K falls). T↑: both↑ (more time = more uncertainty). σ↑: both↑ (more volatility = more upside/downside potential). Key: volatility always increases both call and put prices.',
    },
    {
      question: 'Value a European call: S=100, K=100, r=5%, σ=20%, T=1.',
      answer: 'd₁ = [ln(1) + (0.05 + 0.02)×1] / (0.2×1) = 0.07/0.2 = 0.35. d₂ = 0.35 − 0.2 = 0.15. N(0.35) ≈ 0.637, N(0.15) ≈ 0.560. C = 100×0.637 − 100×e^(−0.05)×0.560 = 63.7 − 53.2 = £10.45.',
    },
    {
      question: 'Why does Black-Scholes assume lognormal stock prices?',
      answer: 'Returns are assumed to be normally distributed (ln(S_T/S₀) ~ N[(r−σ²/2)T, σ²T]). This implies S_T > 0 always (limited liability). Lognormal prevents negative prices. The model also assumes constant σ, no dividends, continuous trading, and no transaction costs.',
    },
  ],
  'put-call': [
    {
      question: 'State and prove put-call parity using arbitrage.',
      answer: 'C − P = S − Ke^(−rT). Proof: Portfolio A: long call + Ke^(−rT) cash. Portfolio B: long put + long stock. At T: A pays max(S_T,K), B pays max(S_T,K). Same payoff ⟹ same price today. If violated: buy cheap, sell expensive → riskless profit → prices converge.',
    },
    {
      question: 'If C=5, S=100, K=95, r=5%, T=0.5, find P.',
      answer: 'P = C − S + Ke^(−rT) = 5 − 100 + 95·e^(−0.025) = 5 − 100 + 92.65 = −2.35. Negative put price is impossible → P ≈ 0 or the inputs imply deep in-the-money call. Check: put-call parity gives minimum: C ≥ S − Ke^(−rT) = 7.35, so C=5 violates parity — there\'s an arbitrage.',
    },
    {
      question: 'Does put-call parity hold for American options? Why not?',
      answer: 'No. American options can be exercised early. Put-call parity becomes an inequality: S − K ≤ C − P ≤ S − Ke^(−rT). Early exercise of an American put may be optimal (especially deep in-the-money), breaking the exact equality. Put-call parity holds exactly only for European options.',
    },
  ],
  'capital-imperfections': [
    {
      question: 'State the conditions required for MM irrelevance to hold.',
      answer: 'Perfect capital markets require: (1) No taxes, (2) No transaction costs, (3) No bankruptcy costs, (4) Symmetric information, (5) Homogeneous expectations, (6) Individuals can borrow/lend at same rate as firms. Violation of ANY condition may make capital structure relevant.',
    },
    {
      question: 'How do heterogeneous expectations cause capital structure to matter?',
      answer: 'If investors disagree about firm value, they cannot perfectly replicate the firm\'s capital structure via homemade leverage. Optimists prefer equity (upside), pessimists prefer debt (downside). The firm can exploit this by choosing the security type each group values most highly, reducing its cost of capital.',
    },
    {
      question: 'Explain how transaction costs break MM irrelevance.',
      answer: 'MM assumes investors can replicate any capital structure costlessly via personal leverage. With transaction costs, this replication is expensive. Investors will pay a premium for firms that provide their preferred debt-equity mix directly. This creates a role for financial structure — firms can add value by catering to clienteles.',
    },
    {
      question: 'What is the tax clientele effect and how does it affect MM?',
      answer: 'Different investors face different tax rates on dividends vs capital gains (e.g. pension funds are tax-exempt; high-rate individuals prefer capital gains). Firms can attract a clientele by setting dividend policy to match. This makes dividend/financing policy relevant even if there\'s no single optimal policy — it depends on who holds the firm.',
    },
  ],
  'capital-structure': [
    {
      question: 'Prove MM Proposition I with corporate tax: V_L = V_U + T_c·D.',
      answer: 'Unlevered firm pays tax on all earnings: V_U = EBIT(1−T_c)/r_A. Levered firm: interest r_D·D is tax-deductible. Annual tax shield = T_c·r_D·D. PV of perpetual tax shield = T_c·D. So V_L = V_U + T_c·D. Arbitrage proof: if V_L ≠ V_U + T_c·D, buy underpriced firm, short overpriced → riskless profit.',
    },
    {
      question: 'State MM Proposition II with taxes and explain the intuition.',
      answer: 'r_E = r_A + (D/E)(r_A − r_D)(1 − T_c). Intuition: as leverage increases, equity becomes riskier (residual claim after debt). Shareholders demand higher return. But with taxes, the increase is dampened by (1−T_c) because some risk is borne by the government via tax shield.',
    },
    {
      question: 'What is the optimal capital structure in the MM with-tax world?',
      answer: '100% debt — every £ of debt adds T_c·£ of value via tax shield with no offsetting cost. This is unrealistic because MM ignores bankruptcy costs, agency costs, and signalling. In practice, trade-off theory says optimum balances tax shield against financial distress costs.',
    },
  ],
  'corporate-tax': [
    {
      question: 'A firm has V_U = £200m, T_c = 25%, D = £80m. Find V_L and E.',
      answer: 'V_L = V_U + T_c·D = 200 + 0.25×80 = 200 + 20 = £220m. E = V_L − D = 220 − 80 = £140m. Tax shield of £20m is captured by equity holders (debt holders get promised cash flows, shareholders get the residual + shield).',
    },
    {
      question: 'Explain how leverage increases equity returns (MM Prop II). Is this good for shareholders?',
      answer: 'r_E = r_A + (D/E)(r_A − r_D). Leverage amplifies equity returns because equity is the residual claim. But risk also increases proportionally — higher expected return compensates for higher risk. Shareholders are not better off in a risk-adjusted sense (no free lunch). They just bear more risk.',
    },
    {
      question: 'What are the costs of financial distress that offset the tax shield benefit?',
      answer: 'Direct costs: legal/administrative fees in bankruptcy (typically 3–5% of firm value). Indirect costs (larger): underinvestment (debt overhang), asset substitution (risk-shifting), loss of customers/suppliers who fear non-performance, management distraction. Trade-off theory: V_L = V_U + PV(tax shield) − PV(distress costs).',
    },
  ],
  'capital-budgeting': [
    {
      question: 'Compare the risk-adjusted discount rate (RADR) and certainty-equivalent (CE) approaches to NPV.',
      answer: 'RADR: NPV = Σ E(CF_t)/(1+r)^t − I₀, where r = r_f + β·MRP. CE: NPV = Σ α_t·E(CF_t)/(1+r_f)^t − I₀, where α_t adjusts for risk. Both are equivalent if applied consistently. CE is more flexible (different α per period); RADR assumes constant risk proportion over time. Show which you\'re using — both get marks.',
    },
    {
      question: 'How do you estimate the discount rate for a new project that differs from the firm\'s existing business?',
      answer: '(1) Find a pure-play comparable firm in the same industry as the project. (2) Unlever its beta: β_U = β_L/[1+(D/E)(1−T_c)]. (3) Re-lever for your firm\'s capital structure: β_L* = β_U·[1+(D/E)*·(1−T_c)]. (4) Apply CAPM: r = r_f + β_L*·MRP. Use project beta, not firm beta — firm beta mixes all projects.',
    },
    {
      question: 'A project has E(CF) = £100k, α = 0.85, r_f = 4%. Find CE-NPV (single period, I₀ = £75k).',
      answer: 'CE cash flow = α·E(CF) = 0.85 × 100,000 = £85,000. NPV = 85,000/(1.04) − 75,000 = 81,731 − 75,000 = £6,731. Accept (NPV > 0). Note: α < 1 reflects risk aversion — we accept less than the expected value with certainty.',
    },
    {
      question: 'What is the certainty-equivalent coefficient α and what determines it?',
      answer: 'α_t converts risky E(CF_t) to its certain equivalent: CE_t = α_t · E(CF_t). Formally: α_t = [E(CF_t) − λ·Cov(CF_t, r_m)] / E(CF_t), where λ = [E(r_m)−r_f]/Var(r_m) is the market price of risk. α < 1 for positively correlated cash flows. α = 1 if CF uncorrelated with market (pure idiosyncratic risk).',
    },
  ],
}
