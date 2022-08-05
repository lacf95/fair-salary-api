import * as R from 'ramda';
import Toucan from 'toucan-js';

const isProduction = () => ENV == 'production';

const localLogger = () => ({
  message: console.log,
  error: console.error
});

const sentryLogger = event => {
  const sentry = new Toucan({
    dsn: SENTRY_DSN,
    context: event,
    environment: ENV,
    allowedSearchParams: /(.*)/
  });

  const message = sentry.captureMessage;
  const error = sentry.captureException;

  return {
    message,
    error
  };
};

const logger = R.ifElse(isProduction, sentryLogger, localLogger);

export default logger;
