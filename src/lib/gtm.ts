/**
 * Lightweight event tracking utilities.
 *
 * This module only pushes events into a local dataLayer array. It does not load
 * any analytics vendor script by itself.
 */

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Event types for better type safety
export type GTMEvent =
  // Page view events
  | 'page_view'
  | 'view_landing_page'
  | 'view_generator'
  | 'view_pricing'
  | 'view_dashboard'
  // User behavior events
  | 'click_cta'
  | 'click_login'
  | 'login_success'
  | 'sign_up'
  // Generator interaction events
  | 'select_template'
  | 'upload_photo'
  | 'upload_video'
  | 'change_resolution'
  | 'calculate_credits'
  // Generation flow events
  | 'click_generate'
  | 'generate_start'
  | 'generate_complete'
  | 'generate_failed'
  | 'download_video'
  | 'download_ai_video'
  // Conversion events
  | 'view_pricing_from_insufficient'
  | 'click_upgrade'
  | 'begin_checkout'
  | 'purchase'
  | 'click_buy_credits'
  | 'purchase_credits'
  // Retention events
  | 'view_history'
  | 'manage_subscription'
  | 'upload_reference_photo'
  | 'upload_reference_video'
  | 'download_ai_image';

export interface GTMEventParams {
  // Common params
  user_id?: string;
  user_plan?: 'free' | 'pro' | 'lifetime';
  credits_balance?: number;

  // CTA specific
  button_location?:
    | 'hero'
    | 'feature'
    | 'footer'
    | 'navbar'
    | 'dashboard'
    | string;
  button_text?: string;
  destination?: string;
  source?: string;

  // Auth specific
  method?: 'google' | 'github' | 'email' | string;

  // File specific
  file_size?: number;
  file_type?: string;
  user_status?: 'logged_in' | 'not_logged_in' | string;

  // Template specific
  template_id?: string;
  template_name?: string;
  template_type?: 'video' | 'image' | string;

  // Generator specific
  generator_type?: 'image' | 'video' | string;
  mode?: 'video_to_video' | 'image_to_video' | 'text_to_video' | string;

  // Resolution specific
  resolution?: '720p' | '1080p' | string;

  // Credits specific
  credits_needed?: number;
  credits_available?: number;
  credits_consumed?: number;
  credits_amount?: number;
  duration?: number;

  // Job specific
  job_id?: string;
  status?: 'pending' | 'running' | 'succeeded' | 'failed';
  error_reason?: string;

  // Purchase specific
  plan_id?: string; // Plan ID from Stripe or other payment provider
  package_id?: string; // Package ID for credit purchases
  billing_cycle?: 'monthly' | 'yearly' | 'one_time' | string;
  transaction_id?: string;
  value?: number;
  currency?: string;
  amount?: number;

  // Additional custom params
  [key: string]: any;
}

/**
 * Push an event to the local dataLayer
 * @param event - The event name
 * @param params - Event parameters
 */
export function trackEvent(event: GTMEvent, params?: GTMEventParams): void {
  if (typeof window === 'undefined') {
    return; // Skip on server side
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...params,
      timestamp: new Date().toISOString(),
    });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Tracking Event]', event, params);
    }
  } catch (error) {
    console.error('[Tracking] Error tracking event:', error);
  }
}

/**
 * Track page view
 * @param pagePath - The page path
 * @param pageTitle - The page title
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
}

/**
 * Track CTA click
 * @param location - Where the CTA is located
 * @param text - The button text
 * @param destination - Where the CTA leads to
 */
export function trackCTAClick(
  location: string,
  text: string,
  destination?: string
): void {
  trackEvent('click_cta', {
    button_location: location,
    button_text: text,
    destination,
  });
}

/**
 * Track user authentication
 * @param action - 'login' or 'signup'
 * @param method - Authentication method
 * @param userId - User ID
 */
export function trackAuth(
  action: 'login' | 'signup',
  method: string,
  userId?: string
): void {
  const event = action === 'login' ? 'login_success' : 'sign_up';
  trackEvent(event, {
    method,
    user_id: userId,
  });
}

/**
 * Track generation flow
 * @param stage - The generation stage
 * @param params - Stage-specific parameters
 */
export function trackGeneration(
  stage: 'click' | 'start' | 'complete' | 'failed',
  params: GTMEventParams
): void {
  const eventMap = {
    click: 'click_generate',
    start: 'generate_start',
    complete: 'generate_complete',
    failed: 'generate_failed',
  } as const;

  trackEvent(eventMap[stage], params);
}

/**
 * Track purchase/conversion
 * @param type - 'subscription' or 'credits'
 * @param params - Purchase parameters
 */
export function trackPurchase(
  type: 'subscription' | 'credits',
  params: GTMEventParams
): void {
  const event = type === 'subscription' ? 'purchase' : 'purchase_credits';
  trackEvent(event, params);
}

/**
 * Track checkout initiation
 * @param planId - The plan being purchased
 * @param amount - The amount
 * @param currency - The currency
 */
export function trackBeginCheckout(
  planId: string,
  amount: number,
  currency = 'USD'
): void {
  trackEvent('begin_checkout', {
    plan_id: planId,
    value: amount / 100, // Convert cents to dollars
    currency,
    amount,
  });
}

/**
 * Get user context for events
 * This should be called with actual user data from your auth system
 */
export function getUserContext(
  session: any,
  creditBalance?: number
): GTMEventParams {
  if (!session) {
    return {};
  }

  return {
    user_id: session.user?.id,
    user_plan: session.user?.planId || 'free',
    credits_balance: creditBalance,
  };
}

/**
 * Track server-side events.
 *
 * Google Analytics / GTM delivery is intentionally not wired in this project;
 * analytics tags should be configured outside the application code.
 */
export async function trackServerEvent(
  event: GTMEvent,
  params?: GTMEventParams,
  userId?: string
): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Tracking disabled]', event, params, userId);
  }
}
