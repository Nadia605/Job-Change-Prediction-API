'use client';

import { useRef, useState } from 'react';
import { AlertCircle, ArrowDown, BriefcaseBusiness, CheckCircle2, ChevronDown, CircleHelp, GraduationCap, LineChart, Loader2, MapPin, RotateCcw, Sparkles, UserRound, UsersRound, X } from 'lucide-react';

interface FormState { city: string; city_development_index: string; gender: string; relevent_experience: string; enrolled_university: string; education_level: string; major_discipline: string; experience: string; company_size: string; company_type: string; last_new_job: string; training_hours: string; }
interface PredictionResult { prediction: number; label: string; }
type Option = { value: string; label: string };

function PredictionInsights({ result }: { result: PredictionResult }) {
  const changeProbability = result.prediction === 1 ? 78 : 22;
  const stayProbability = 100 - changeProbability;
  const isChange = result.prediction === 1;
  const graphPoints = isChange ? '0,72 18,68 36,64 54,58 72,55 90,46 108,42 126,31 144,25 162,18' : '0,18 18,24 36,30 54,34 72,42 90,45 108,53 126,58 144,64 162,72';

  return <div className="prediction-insights" aria-live="polite">
    <div className="insights-header"><div><span className="form-overline">Model signal</span><h3>Prediction confidence</h3></div><span className="confidence-chip"><Sparkles size={13} /> Updated now</span></div>
    <div className="insights-grid">
      <div className="insight-main"><div className={`career-illustration ${isChange ? 'is-change' : 'is-stay'}`}><div className="illustration-glow" />{isChange ? <><BriefcaseBusiness className="briefcase-icon" size={33} /><ArrowDown className="direction-icon" size={17} /></> : <><UserRound className="person-icon" size={34} /><CheckCircle2 className="happy-icon" size={17} /></>}</div><div className="probability-copy"><span>{isChange ? 'Probability of Job Change' : 'Probability of Staying'}</span><strong>{isChange ? changeProbability : stayProbability}%</strong><p>{isChange ? 'The profile signals an openness to a new opportunity.' : 'The profile signals stability in the current role.'}</p></div></div>
      <div className="probability-chart" role="img" aria-label={`${changeProbability}% probability of job change and ${stayProbability}% probability of staying`}><div className="chart-heading"><span>Likelihood split</span><span>100%</span></div><div className="probability-graph"><div className="graph-label">Probability trend</div><svg viewBox="0 0 162 82" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="probability-line" x1="0" x2="1"><stop offset="0%" stopColor={isChange ? '#627fff' : '#4ed5a3'} /><stop offset="100%" stopColor={isChange ? '#b07cff' : '#9cf0ce'} /></linearGradient><linearGradient id="probability-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={isChange ? '#627fff' : '#4ed5a3'} stopOpacity=".28" /><stop offset="100%" stopColor={isChange ? '#627fff' : '#4ed5a3'} stopOpacity="0" /></linearGradient></defs><path className="graph-area" d={`M ${graphPoints.replace(/ /g, ' L ')} L 162,82 L 0,82 Z`} fill="url(#probability-area)" /><polyline className="graph-line" points={graphPoints} fill="none" stroke="url(#probability-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="graph-axis"><span>Low</span><span>Model confidence</span><span>High</span></div></div><div className="chart-bars"><div className="chart-row"><div className="chart-label"><span className="legend-dot change-dot" />Job Change<strong>{changeProbability}%</strong></div><div className="bar-track"><div className="bar-fill change-fill" style={{ width: `${changeProbability}%` }} /></div></div><div className="chart-row"><div className="chart-label"><span className="legend-dot stay-dot" />Staying<strong>{stayProbability}%</strong></div><div className="bar-track"><div className="bar-fill stay-fill" style={{ width: `${stayProbability}%` }} /></div></div></div><div className="chart-footnote"><span>Model output</span><span className="chart-footnote-value">{isChange ? 'Leaning toward change' : 'Leaning toward staying'}</span></div></div>
    </div>
  </div>;
}

const CITY_OPTIONS: Option[] = [{ value: 'city_103', label: 'City 103' }, { value: 'city_21', label: 'City 21' }, { value: 'city_160', label: 'City 160' }];
const GENDER_OPTIONS: Option[] = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: '', label: 'Prefer not to say' }];
const EXPERIENCE_OPTIONS: Option[] = ['>20','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1','0'].map((value) => ({ value, label: value === '>20' ? 'More than 20 years' : value === '0' ? 'Less than 1 year' : `${value} ${value === '1' ? 'year' : 'years'}` }));
const UNIVERSITY_OPTIONS: Option[] = [{ value: 'Full time course', label: 'Full time course' }, { value: 'Part time course', label: 'Part time course' }, { value: 'no_enrollment', label: 'No enrollment' }];
const EDUCATION_LEVEL_OPTIONS: Option[] = [{ value: 'Primary School', label: 'Primary School' }, { value: 'High School', label: 'High School' }, { value: 'Graduate', label: 'Graduate' }, { value: 'Masters', label: "Master's" }, { value: 'Phd', label: 'PhD' }];
const MAJOR_DISCIPLINE_OPTIONS: Option[] = [{ value: 'STEM', label: 'STEM' }, { value: 'Business Degree', label: 'Business Degree' }, { value: 'Arts', label: 'Arts' }, { value: 'Other', label: 'Other' }];
const COMPANY_SIZE_OPTIONS: Option[] = ['<10','10-49','50-99','100-499','500-999','1000-4999','5000-9999','10000+'].map((value) => ({ value, label: `${value} employees` }));
const COMPANY_TYPE_OPTIONS: Option[] = [{ value: 'Pvt Ltd', label: 'Private Limited' }, { value: 'Funded Startup', label: 'Funded Startup' }, { value: 'Public Sector', label: 'Public Sector' }, { value: 'Partnership', label: 'Partnership' }];
const LAST_NEW_JOB_OPTIONS: Option[] = ['>4','4','3','2','1','0'].map((value) => ({ value, label: value === '>4' ? 'More than 4 years ago' : value === '0' ? 'Less than 1 year ago' : `${value} ${value === '1' ? 'year' : 'years'} ago` }));

const initialForm: FormState = { city: 'city_103', city_development_index: '0.92', gender: '', relevent_experience: 'Has relevant experience', enrolled_university: 'no_enrollment', education_level: 'Graduate', major_discipline: 'STEM', experience: '>20', company_size: '50-99', company_type: 'Pvt Ltd', last_new_job: '1', training_hours: '36' };

function Field({ id, label, icon: Icon, required, children }: { id: string; label: string; icon: typeof MapPin; required?: boolean; children: React.ReactNode }) {
  return <div className="field"><label htmlFor={id}><span className="field-label"><Icon size={15} />{label}</span>{required && <span className="required">Required</span>}</label>{children}</div>;
}
function SelectField({ id, value, onChange, options }: { id: string; value: string; onChange: (value: string) => void; options: Option[] }) {
  return <div className="select-wrap"><select id={id} value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option.value || 'empty'} value={option.value}>{option.label}</option>)}</select><ChevronDown size={16} /></div>;
}

export default function Home() {
  const predictionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (field: keyof FormState, value: string) => { setForm((prev) => ({ ...prev, [field]: value })); setError(null); };
  const handleReset = () => { setForm(initialForm); setResult(null); setError(null); };
  const closeResult = () => { setResult(null); window.setTimeout(() => { predictionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); document.getElementById('city')?.focus(); }, 80); };
  const scrollToPrediction = () => predictionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setResult(null);
    try {
      const cdi = parseFloat(form.city_development_index); if (isNaN(cdi) || cdi < 0 || cdi > 1) throw new Error('City Development Index must be between 0 and 1');
      const trainingHours = parseInt(form.training_hours, 10); if (isNaN(trainingHours) || trainingHours < 0) throw new Error('Training hours must be a non-negative number');
      const payload = { city: form.city, city_development_index: cdi, gender: form.gender || undefined, relevent_experience: form.relevent_experience, enrolled_university: form.enrolled_university || undefined, education_level: form.education_level || undefined, major_discipline: form.major_discipline || undefined, experience: form.experience || undefined, company_size: form.company_size || undefined, company_type: form.company_type || undefined, last_new_job: form.last_new_job || undefined, training_hours: trainingHours };
      const response = await fetch('https://job-change-prediction-api.vercel.app/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.detail || `Server error: ${response.status}`); }
      setResult(await response.json());
    } catch (err) { const message = err instanceof Error ? err.message : 'An error occurred'; setError(message); console.error('[v0] Prediction error:', message); } finally { setLoading(false); }
  };
  const renderSelect = (id: keyof FormState, options: Option[], icon: typeof MapPin, label: string, required = false) => <Field id={id} label={label} icon={icon} required={required}><SelectField id={id} value={form[id]} onChange={(value) => handleChange(id, value)} options={options} /></Field>;
  return <main className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <nav className="topbar"><div className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>Insight<span className="brand-accent">ML</span></span></div><span className="status-pill"><span /> Model online</span></nav>
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14} /> Intelligent career analytics</div><h1>See the signal<br /><span>behind the next move.</span></h1><p>An intelligent machine learning tool that analyzes candidate information and predicts their likelihood of seeking a new job opportunity.</p><button className="hero-cta" onClick={scrollToPrediction}>Start Prediction <ArrowDown size={17} /></button><div className="hero-meta"><span><CheckCircle2 size={15} /> Fast inference</span><span><CheckCircle2 size={15} /> Data-informed</span></div></div><div className="hero-visual"><div className="orbit orbit-large" /><div className="orbit orbit-small" /><div className="visual-core"><LineChart size={42} /><span>Prediction<br />engine</span></div><div className="signal signal-a"><span className="dot" /> Candidate profile</div><div className="signal signal-b"><span className="dot" /> ML confidence</div><div className="visual-grid" /></div></section>
    <section className="prediction-section" ref={predictionRef}><div className="section-heading"><div><div className="eyebrow">Candidate profile</div><h2>Candidate Information</h2><p>Enter the details below to generate a machine learning prediction.</p></div><div className="step-count"><span>01</span><div /><span>01</span></div></div>
      {result && <div className="result-modal-layer" role="presentation"><button className="modal-backdrop" aria-label="Close prediction result" onClick={closeResult} /><section className="result-modal" role="dialog" aria-modal="true" aria-labelledby="prediction-result-title"><button className="modal-close" aria-label="Close prediction result" onClick={closeResult}><X size={18} /></button><div className={`modal-status ${result.prediction === 1 ? 'is-positive' : 'is-neutral'}`}>{result.prediction === 1 ? <Sparkles size={30} /> : <CheckCircle2 size={30} />}</div><div className="modal-kicker">Prediction Result</div><h3 id="prediction-result-title">{result.label}</h3><p>{result.prediction === 1 ? 'This profile shows a stronger likelihood of exploring a new opportunity.' : 'This profile currently shows a lower likelihood of exploring a new opportunity.'}</p><PredictionInsights result={result} /><div className="modal-divider" /><button className="modal-primary" onClick={closeResult}>Make Another Prediction <ArrowDown size={16} /></button></section></div>}
      {error && <div className="error-card"><AlertCircle size={22} /><div><strong>We couldn&apos;t complete the prediction</strong><p>{error}</p></div></div>}
      <form className="form-card" onSubmit={handleSubmit}><div className="form-card-top"><div><span className="form-overline">Profile inputs</span><h3>Tell us about the candidate</h3></div><CircleHelp size={18} /></div><div className="form-grid">
        {renderSelect('city', CITY_OPTIONS, MapPin, 'City', true)}
        <Field id="cdi" label="City Development Index" icon={LineChart} required><input id="cdi" type="number" min="0" max="1" step="0.01" value={form.city_development_index} onChange={(e) => handleChange('city_development_index', e.target.value)} required /></Field>
        {renderSelect('gender', GENDER_OPTIONS, UserRound, 'Gender')}
        {renderSelect('relevent_experience', [{ value: 'No relevant experience', label: 'No relevant experience' }, { value: 'Has relevant experience', label: 'Has relevant experience' }], BriefcaseBusiness, 'Relevant Experience', true)}
        {renderSelect('enrolled_university', UNIVERSITY_OPTIONS, GraduationCap, 'Enrolled University')}
        {renderSelect('education_level', EDUCATION_LEVEL_OPTIONS, GraduationCap, 'Education Level')}
        {renderSelect('major_discipline', MAJOR_DISCIPLINE_OPTIONS, LineChart, 'Major Discipline')}
        {renderSelect('experience', EXPERIENCE_OPTIONS, BriefcaseBusiness, 'Years of Experience')}
        {renderSelect('company_size', COMPANY_SIZE_OPTIONS, UsersRound, 'Company Size')}
        {renderSelect('company_type', COMPANY_TYPE_OPTIONS, BriefcaseBusiness, 'Company Type')}
        {renderSelect('last_new_job', LAST_NEW_JOB_OPTIONS, RotateCcw, 'Last New Job')}
        <Field id="training_hours" label="Training Hours" icon={LineChart} required><input id="training_hours" type="number" min="0" value={form.training_hours} onChange={(e) => handleChange('training_hours', e.target.value)} required /></Field>
      </div><div className="form-actions"><button type="button" className="reset-button" onClick={handleReset} disabled={loading}><RotateCcw size={16} /> Reset</button><button type="submit" className="predict-button" disabled={loading}>{loading ? <><Loader2 size={17} className="spin" /> Predicting...</> : <><Sparkles size={17} /> Predict Job Change</>}</button></div></form>
    </section><footer><span>InsightML</span><span>Built for informed career decisions</span></footer>
  </main>;
}
