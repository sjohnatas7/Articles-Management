import { useAppDispatch } from "../store/hooks"
import { showConclude, showError } from "../store/slices/snackbar/snackbarSlice"

export default function showErrorOrConclude() {
    const dispatch = useAppDispatch()
    function showMessageError(e: any) {
        console.log(e)
        let msg: string;
        if (e && e.response && e.response.data) {
            msg = e.response.data
        } else if (typeof e === 'string') {
            msg = e
        } else {
            msg = 'Ops... Aconteceu um erro'
        }
        dispatch(showError(msg))
    }
    function showMessageConclude(element: { item: string, method: 'post' | 'put' | 'delete' }) {
        const { item, method } = element
        let action: string
        if (method === 'put') {
            action = 'atualizado'
        } else if (method === 'delete') {
            action = 'excluido'
        } else {
            action = 'salvo'
        }
        dispatch(showConclude(`${item} ${action} com sucesso`))
    }
    return { showMessageConclude, showMessageError }
}
