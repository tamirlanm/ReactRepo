import { useEffect, useRef, useState } from "react";
import { createGame, validateGame } from "../api/gamesApi";
import { CATEGORIES } from "../data/options";
import StatusMessage from "./StatusMessage";

const INITIAL_VALUES = {
  title: "",
  category: "Strategy",
  minPlayers: "2",
  maxPlayers: "4",
  duration: "60",
  rating: "7.0",
  description: "",
};

export default function GameForm({ onCreated }) {
  const [values, setValues] = useState({ ...INITIAL_VALUES });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestRef = useRef(null);

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitError("");
  }

  function handleReset() {
    setValues({ ...INITIAL_VALUES });
    setErrors({});
    setSubmitError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (requestRef.current) {
      return;
    }

    const nextErrors = validateGame(values);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setIsSubmitting(true);

    try {
      const game = await createGame(values, {
        signal: controller.signal,
      });

      if (!controller.signal.aborted) {
        onCreated(game);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setSubmitError(error.message || "Could not save the game.");
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
      }

      if (!controller.signal.aborted) {
        setIsSubmitting(false);
      }
    }
  }

  function errorFor(name) {
    return errors[name] ? (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    ) : null;
  }

  return (
    <form
      className="game-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {submitError && (
        <StatusMessage type="error" title="Could not add game">
          <p>{submitError}</p>
        </StatusMessage>
      )}

      <fieldset disabled={isSubmitting} className="form-fields">
        <div className="form-grid">
          <label className="field full-width">
            <span>Game title</span>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              maxLength={80}
              required
              aria-invalid={Boolean(errors.title)}
              aria-describedby={
                errors.title ? "title-error" : undefined
              }
              placeholder="For example, My Board Game"
            />
            {errorFor("title")}
          </label>

          <label className="field full-width">
            <span>Category</span>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={
                errors.category ? "category-error" : undefined
              }
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errorFor("category")}
          </label>

          <label className="field">
            <span>Minimum players</span>
            <input
              type="number"
              name="minPlayers"
              min="1"
              max="20"
              step="1"
              value={values.minPlayers}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.minPlayers)}
              aria-describedby={
                errors.minPlayers ? "minPlayers-error" : undefined
              }
            />
            {errorFor("minPlayers")}
          </label>

          <label className="field">
            <span>Maximum players</span>
            <input
              type="number"
              name="maxPlayers"
              min="1"
              max="20"
              step="1"
              value={values.maxPlayers}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.maxPlayers)}
              aria-describedby={
                errors.maxPlayers ? "maxPlayers-error" : undefined
              }
            />
            {errorFor("maxPlayers")}
          </label>

          <label className="field">
            <span>Duration in minutes</span>
            <input
              type="number"
              name="duration"
              min="5"
              max="600"
              step="1"
              value={values.duration}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.duration)}
              aria-describedby={
                errors.duration ? "duration-error" : undefined
              }
            />
            {errorFor("duration")}
          </label>

          <label className="field">
            <span>Your rating</span>
            <input
              type="number"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              value={values.rating}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.rating)}
              aria-describedby={
                errors.rating ? "rating-error" : undefined
              }
            />
            {errorFor("rating")}
          </label>

          <label className="field full-width">
            <span>Description</span>
            <textarea
              name="description"
              rows={6}
              minLength={20}
              maxLength={1500}
              value={values.description}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              placeholder="Describe the game and explain who might enjoy it."
            />
            <span className="field-hint">
              {values.description.length}/1500 characters
            </span>
            {errorFor("description")}
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="button">
            {isSubmitting ? "Saving game..." : "Add game"}
          </button>

          <button
            type="button"
            className="button button-secondary"
            onClick={handleReset}
          >
            Clear form
          </button>
        </div>
      </fieldset>
    </form>
  );
}