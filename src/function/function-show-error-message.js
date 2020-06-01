// https://quasar.dev/quasar-plugins/dialog#Usage
import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
  Loading.hide()
  Dialog.create({
    title: 'エラー',
    message: errorMessage,
    html: true
  })

}
