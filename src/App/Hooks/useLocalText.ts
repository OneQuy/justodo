export const NoPermissionText = "Make sure you have enabled notifications for the app in your phone Settings. If you have, try again!"
export const NotLatestConfig = "Can not get the latest config. Please check your internet and try again."
export const CanNotSetupUserData = 'Can not setup data. Please check your internet and try again.'
export const PopupTitleError = 'Error'
export const RetryText = 'Retry'

export const NoNotificationPermissionLocalKey = 'no_permission'

const eng = {
  update_line: "New version! Let's update for the best experience!",
  invalid_input: 'Invalid input',
  retry: RetryText,
  later: 'Later',
  cancel: 'Cancel',
  confirm: 'Confirm',
  onequy_apps: 'Check out my other awesome apps',
  pro: 'Pro',
  restore_purchase: 'Restore purchase',
  rate_app: 'Rate ### 5-star!',
  rate: 'Rate',
  restore: 'Restore',
  upgrade: "Upgrade",
  purchase_success: 'You have just upgraded successfully!\n\nThank you for purchasing. You unlocked all vocabularies and features of Vocaby!',
  about: 'About',
  contact_dev: 'Contact the developer',
  community: 'Community',
  follow_community: "Follow to stay updated with the latest news about ###.",
  copied: 'Copied',
  purchased_but_cannot_sync: "Purchase successful! You have the Pro subscription, but data cannot sync to the server. Please check your internet and try again.",
  sale_ends: "The sale ends on ###",

  // welcome: "Welcome to ABC",
  // welcome_content: "### is a simple app that helps you learn English vocabulary effortlessly through notifications. Each notification introduces a new word.",
  // welcome_item_0: "Customize the frequency of notifications",
  // welcome_item_1: "Supports translations in over 100 languages",
  // welcome_item_2: "### levels of vocabulary popularity",
  // welcome_item_3: "A total of up to ### words to learn",
  // start_text: "Okayyyyyy",

  popup_error: PopupTitleError,
  [NoNotificationPermissionLocalKey]: NoPermissionText,
  fail_download: 'Fail to download.',
  restore_purchase_no_products: 'No product to restore',
  cannot_setup_data: CanNotSetupUserData
} as const

export type LocalText = typeof eng

const useLocalText = (): LocalText => {
  return eng
}

export default useLocalText