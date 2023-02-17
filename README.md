@detrenasama/modal-hooker
=========================

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/badge/npm-2.0.6-blue
[npm-url]: https://npmjs.org/package/address

Control your modals with hook

## Install

```bash
$ npm install @detrenasama/modal-hooker
```

## Usage

### Create modal component (wrapper)

Next props will be passed to component:

`modal` ... content of wrapper. Just draw it in render as {modal} \
`isOpening` ... current state. Use for animations (styles) \
`isClosing` ... current state. Use for animations (styles) \
`closeModal` ... callback for closing this modal

Pass it to ModalContainer for using as default container.

Pass to hook for using it when needed.

```js
useModal(MyModal, {}, ModalWrapper)
```

### Insert ModalContainer component into your Application

If your modal can contain links, put it into your Router component
Provide default modal, that will be used as modal wrapper

```js
<ModalContainer defaultModalComponent="ModalWrapper" />

```

### Create modal content component

Instance of this content will be passed as `modal` prop into your wrapper 

```js

function MyModal({title, onClose}) {
    return <div>
        <h3>{title}</h3>
        <button onClick={onClose}>Close</button>
    </div>
}

```

### Use modal hook in component where you need to show modal

```js

function MyPageOrSomething() {
    const [openModal, closeModal] = useModal(MyModal, {
        title: "My title",
        onClose: () => {
            closeModal()
        }
    })
    
    return <div>
        <button onClick={openModal}>Open modal</button>
    </div>
}

```

## License

[MIT](LICENSE.txt)
