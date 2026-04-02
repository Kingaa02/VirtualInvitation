import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Beer, Lock, User, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginInput.trim() || !password.trim()) {
      setError("Wypełnij wszystkie pola");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(loginInput, password);
      navigate("/invitation");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 left-10 text-6xl opacity-10 animate-float'>
          🍺
        </div>
        <div className='absolute bottom-32 right-20 text-8xl opacity-10 animate-float-slow'>
          🍻
        </div>
        <div className='absolute top-1/3 right-10 text-4xl opacity-5 animate-bounce'>
          🍺
        </div>
        <div className='absolute bottom-1/4 left-1/4 text-5xl opacity-5 animate-pulse'>
          🍻
        </div>
      </div>

      {/* Grain overlay */}
      <div className='absolute inset-0 bg-grain pointer-events-none'></div>

      {/* Login card */}
      <div className='glass-card p-8 md:p-12 w-full max-w-md relative z-10'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-beer-amber-400 to-beer-amber-600 mb-4 shadow-lg animate-float'>
            <Beer className='w-10 h-10 text-beer-dark' />
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2 text-shadow-glow'>
            Zaproszenie 🍺
          </h1>
          <p className='text-white/70'>
            Wpisz dane logowania, aby zobaczyć zaproszenie
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Login input */}
          <div>
            <label
              className='block text-white/80 text-sm font-medium mb-2'
              htmlFor='login'>
              Login
            </label>
            <div className='relative'>
              <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50' />
              <input
                id='login'
                type='text'
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className='input-field pl-12'
                placeholder='Twój login'
                disabled={isSubmitting}
                autoComplete='username'
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label
              className='block text-white/80 text-sm font-medium mb-2'
              htmlFor='password'>
              Hasło
            </label>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50' />
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='input-field pl-12'
                placeholder='••••••••'
                disabled={isSubmitting}
                autoComplete='current-password'
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className='flex items-center gap-2 text-red-400 bg-red-500/10 rounded-lg p-3'>
              <AlertCircle className='w-5 h-5 flex-shrink-0' />
              <span className='text-sm'>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
            {isSubmitting ? (
              <>
                <Loader2 className='w-5 h-5 animate-spin' />
                Logowanie...
              </>
            ) : (
              <>
                <Beer className='w-5 h-5' />
                Otwórz zaproszenie
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
