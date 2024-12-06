/**
 * Unified configuration to support Node.js, Cloudflare Workers, and user-provided API keys.
 */

export function getAPIKey(cloudflareEnv: Env, provider: string, userApiKeys?: Record<string, string>) {
  /**
   * Determines the runtime environment and retrieves the appropriate API key.
   */

  // Detect if running in a Cloudflare Worker
  const isCloudflareWorker = typeof process === 'undefined';

  // First check user-provided API keys
  if (userApiKeys?.[provider]) {
    return userApiKeys[provider];
  }

  // Access the appropriate environment variables based on the runtime
  const getEnvVar = (key: string) =>
    isCloudflareWorker ? cloudflareEnv?.[key] : process.env?.[key];

  // Retrieve the API key based on the provider
  switch (provider) {
    case 'Anthropic':
      return getEnvVar('VITE_ANTHROPIC_API_KEY');
    case 'OpenAI':
      return getEnvVar('VITE_OPENAI_API_KEY');
    case 'Google':
      return getEnvVar('VITE_GOOGLE_GENERATIVE_AI_API_KEY');
    case 'Groq':
      return getEnvVar('VITE_GROQ_API_KEY');
    case 'HuggingFace':
      return getEnvVar('VITE_HuggingFace_API_KEY');
    case 'OpenRouter':
      return getEnvVar('VITE_OPEN_ROUTER_API_KEY');
    case 'Deepseek':
      return getEnvVar('VITE_DEEPSEEK_API_KEY');
    case 'Mistral':
      return getEnvVar('VITE_MISTRAL_API_KEY');
    case 'OpenAILike':
      return getEnvVar('VITE_OPENAI_LIKE_API_KEY');
    case 'xAI':
      return getEnvVar('VITE_XAI_API_KEY');
    case 'Cohere':
      return getEnvVar('VITE_COHERE_API_KEY');
    case 'AzureOpenAI':
      return getEnvVar('VITE_AZURE_OPENAI_API_KEY');
    default:
      return '';
  }
}

export function getBaseURL(cloudflareEnv: Env, provider: string) {
  /**
   * Determines the runtime environment and retrieves the base URL for the specified provider.
   */

  // Detect if running in a Cloudflare Worker
  const isCloudflareWorker = typeof process === 'undefined';

  // Access the appropriate environment variables based on the runtime
  const getEnvVar = (key: string) =>
    isCloudflareWorker ? cloudflareEnv?.[key] : process.env?.[key];

  switch (provider) {
    case 'OpenAILike':
      return getEnvVar('OPENAI_LIKE_API_BASE_URL');
    case 'LMStudio':
      return getEnvVar('LMSTUDIO_API_BASE_URL') || 'http://localhost:1234';
    case 'Ollama': {
      let baseUrl = getEnvVar('OLLAMA_API_BASE_URL') || 'http://localhost:11434';

      // Adjust for Docker environments if running in Node.js
      if (!isCloudflareWorker && process.env.RUNNING_IN_DOCKER === 'true') {
        baseUrl = baseUrl.replace('localhost', 'host.docker.internal');
      }

      return baseUrl;
    }
    default:
      return '';
  }
}
