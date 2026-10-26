import { useEffect, useState } from 'react';
import TextField from './TextField.jsx';

export default function BookingModal({ lecturer, onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', format: 'Онлайн', comment: '' });

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="modal booking-modal" role="dialog" aria-modal="true" aria-label="Форма записи" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Закрыть" onClick={onClose}>×</button>
        {!sent ? (
          <>
            <span className="eyebrow">Запись на занятие</span>
            <h2>{lecturer ? lecturer.name : 'Подберём подходящего лектора'}</h2>
            <p className="booking-intro">
              Оставьте контакты. Мы свяжемся с вами, чтобы обсудить детали и подобрать подходящего лектора.
            </p>
            <form className="booking-form" onSubmit={submit}>
              <TextField
                label="Ваше имя"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Дмитрий"
              />
              <TextField
                label="Телефон или e-mail"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="name@example.ru"
              />
              <label>
                Формат занятия
                <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })}>
                  <option>Онлайн</option>
                  <option>Офлайн</option>
                  <option>Корпоративный</option>
                </select>
              </label>
              <label>
                Комментарий
                <textarea rows="4" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Расскажите о задаче или желаемой теме" />
              </label>
              <button className="button button--full" type="submit">Отправить заявку</button>
            </form>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h2>Заявка заполнена</h2>
            <p>С вами свяжутся в течение 24 часов</p>
            <button className="button" type="button" onClick={onClose}>Готово</button>
          </div>
        )}
      </div>
    </div>
  );
}
