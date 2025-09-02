import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { isAuthenticated, login, error, loading, bootstrap } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => { bootstrap(); }, [bootstrap]);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'100vh', padding:'24px'}}>
      <form onSubmit={handleSubmit} style={{
        width:'min(420px, 92vw)', background:'var(--panel)', border:'1px solid var(--border)',
        borderRadius:'14px', boxShadow:'var(--shadow-lg)', padding:'24px'
      }}>
        <div className="brand" style={{marginBottom:8}}>
          <div className="brand-badge">PN</div>
          <div>
            <div style={{fontWeight:700}}>Welcome back</div>
            <div className="text-muted" style={{fontSize:12}}>Sign in to your notes</div>
          </div>
        </div>
        <div className="divider"></div>
        <label className="text-muted" style={{fontSize:12}}>Email</label>
        <input className="input" placeholder="you@example.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <div style={{height:10}}></div>
        <label className="text-muted" style={{fontSize:12}}>Password</label>
        <input className="input" placeholder="••••••••" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        {error ? <div style={{color:'tomato', marginTop:8, fontSize:13}}>{error}</div> : null}
        <div style={{height:14}}></div>
        <button className="primary-btn" type="submit" disabled={loading} style={{width:'100%', justifyContent:'center'}}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-muted" style={{fontSize:12, marginTop:10}}>
          Demo accepts any email/password and stores a mock session locally.
        </p>
      </form>
    </div>
  );
}
