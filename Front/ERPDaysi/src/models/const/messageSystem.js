export const messageGeneral = {
    msgConfirmation:'Confirmación',
    msgTitleValidation:'Validación',
    msgCancel:'Cancelar',
    msgSave:'Guardar',
    msgCatalogs:'Catálogos',
    msgCUser:'Administración de Usuarios',
    msgCSftp:'Administración de SFTP',
    msgCLlaves:'Administración de Llaves',
    msgCBridge:'Administración de Bridges',
    msgSelectRol:'Selecciona un Rol',
    msgView:'Ver Detalle',
    msgFind:'Buscar',
    msgClean:'Limpiar',
    msgSelectFile:'Seleccionar archivo',
    msgYes:'SI',
    msgNo:'NO',
    msgClosed:'Cerrar Sesión',
    msgSelect:'Selecciona un estatus',
    msgPass01:'Muy débil',
    msgPass02:'Débil',
    msgPass03:'Moderado',
    msgPass04:'Fuerte',
    msgSecurity:'Seguridad',
    msgProfile:'Perfil',
    iconDownload:'pi pi-download',
    iconCancel:'pi pi-times',
    iconDeleted:'pi pi-trash',
    iconModified:'pi pi-pencil',
    iconNew:'pi pi-plus',
    iconSave:'pi pi-check-circle',
    iconHome:'pi pi-home',
    iconView:'pi pi-eye',
    iconFind:'pi pi-search',//Revisar
    iconClean:'pi pi-eraser',//Revisar
    iconExclamation:'pi pi-exclamation-triangle',
    iconExecution: 'pi pi-cog',
    iconClosed:'pi pi-sign-out',
    titleSearch:'Búsqueda',//Revisar
    severitySuccess:'success',
    severityError:'error',
};


export const messageUserPage = {
    msgDeleteConfirmation: '¿Estás seguro de que deseas eliminar al usuario: ',
    msgConfirmDelete: 'El usuario fue eliminado exitosamente.',
    msgConfirmNew: 'El usuario fue guardado exitosamente.',
    msgConfirmUpdate: 'El usuario fue modificado exitosamente.',
    msgHeaderEdit: 'Editar Usuario',
    msgHeaderNew: 'Nuevo Usuario',
};

export const messageTableData = {
    msgEmptyMessage: 'No se encontraron resultados',
    msgHeaderActions: 'Acciones',
    msgToolDeleted: 'Eliminar',
    msgToolModified: 'Modificar',
    msgToolDownload: 'Descargar',
    msgToolExecution: 'Ejecución manual',
};

export const messageUserForm = {
    data: {
        userName: { title: 'Nombre de Usuario:', field: 'userName' },
        password: { title: 'Contraseña:', field: 'password' },
        name: { title: 'Nombre:', field: 'name' },
        firstLastName: { title: 'Primer Apellido:', field: 'firstLastName' },
        secondLastName: { title: 'Segundo Apellido:', field: 'secondLastName' },
        rol: { title: 'Rol:', field: 'idRol' },
    },
};

export const messageFindUser = {
    data: {
        name: { title: 'Nombre', field: 'nameComplete' },
        userName: { title: 'Nombre de Usuario', field: 'userName' },
        rol: { title: 'Rol', field: 'idRol' },
        createdBy: { title: 'Creado Por', field: 'createdBy' }
    },
};

export const messageUserUtil = {
    msgFLNameRequiered: 'El primer apellido es requerido.',
    msgSLNameRequiered: 'El segundo apellido es requerido.',
    msgNameRequiered: 'El nombre es requerido.',
    msgPasswordRequiered: 'La contraseña es requerida.',
    msgRolRequiered: 'El rol es requerido.',
    msgUserRequired: 'El nombre de usuario es requerido.',
    msgUserNotEmail: 'El nombre de usuario debe ser un correo electrónico válido.',
};

export const messageFilePage = {
    msgDeleteConfirmation: '¿Está seguro de que desea eliminar la llave: ',
    msgConfirmDelete: 'La llave fue eliminada exitosamente.',
    msgConfirmNew: 'La llave fue guardada exitosamente.',
    msgConfirmUpdate: 'La llave fue modificada exitosamente.',
    msgHeaderEdit: 'Editar llave',
    msgHeaderNew: 'Nueva llave',
}

export const messageFileForm = {
    data: {
        name: { title: 'Archivo', field: 'name' },
        file: { title: 'File', field: 'file' },
        passphrase: { title: 'Frase de contraseña', field: 'passphrase' }
    }
}
export const messageFindFile = {
    data: {
        name: { title: 'Nombre llave', field: 'name' },
        passphrase: { title: 'Frase', field: 'passphrase' }
    },
}

export const messageBridgeForm = {
    data: {
        name: { title: 'Nombre', field: 'name' },
        idSftpServerSource: { title: 'SFTP origen', field: 'idSftpServerSource' },
        sourceFolder: { title: 'Ruta origen', field: 'sourceFolder' },
        sourceBackup: { title: 'Ruta de resguardo', field: 'sourceBackup' },
        idSftpServerTarget: { title: 'SFTP destino', field: 'idSftpServerTarget' },
        targetFolder: { title: 'Ruta destino', field: 'targetFolder' },
        encryptDecrypt: { title: 'Encriptar', field: 'encryptDecrypt' },
        finalExtension: { title: 'Extensión final', field: 'finalExtension' },
        idPrivateKey: { title: 'Llave privada', field: 'idPrivateKey' },
        idPublicKey: { title: 'Llave pública', field: 'idPublicKey' },
        createdBy: { title: 'Creado por', field: 'createdBy' },
        prefix: { title: 'Prefijo', field: 'prefix' },
        suffix: { title: 'Sufijo', field: 'suffix' },
        maxNumberFile: { title: 'Numero maximo de archivos', field: 'maxNumberFile' },
        deleteBackup: { title: 'Eliminar resguardo', field: 'deleteBackup' },
        executionType: { title: 'Tipo de ejecución', field: 'executionType' },
        waitToDownload: { title: 'Espera para descarga', field: 'waitToDownload' },
        application: { title: 'Aplicación', field: 'application' },

        msgSelect: 'Seleccione una opción',

    }
}


export const messageBridgePage = {
    msgDeleteConfirmation: 'Está seguro de que quiere eliminar el Bridge: ',
    msgConfirmDelete: 'El Bridge fué eliminado exitosamente.',
    msgConfirmNew: 'El Bridge fué guardado exitosamente.',
    msgConfirmUpdate: 'El Bridge fué actualizado exitosamente.',
    msgHeaderEdit: 'Editar Bridge',
    msgHeaderNew: 'Nuevo Bridge',
    msgConfirmExecution: 'El Bridge fué executado exitosamente.',

};
export const messageSftpPage = {
    msgDeleteConfirmation: '¿Estás seguro de que deseas eliminar el SFTP: ',
    msgConfirmDelete: 'El SFTP fué eliminado exitosamente.',
    msgConfirmNew: 'El SFTP fué guardado exitosamente.',
    msgConfirmUpdate: 'El SFTP fué modificado exitosamente.',
    msgHeaderEdit: 'Editar SFTP',
    msgHeaderNew: 'Nuevo SFTP',
}

export const messageFindSftp = {
    data: {
        name: { title: 'Nombre de conexión', field: 'name' },
        hostname: { title: 'Nombre de Host', field: 'hostname' },
        port: { title: 'Puerto', field: 'port' },
        username: { title: 'Nombre de usuario', field: 'username' },
        description: { title: 'Descripción', field: 'description' }
    },
};

export const messageSftpForm = {
    data: {
        name: { title: 'Nombre de la conexión:', field: 'name' },
        hostname: { title: 'Nombre de Host:', field: 'hostname' },
        port: { title: 'Puerto:', field: 'port' },
        description: { title: 'Descripción:', field: 'description' },
        username: { title: 'Nombre de Usuario:', field: 'username' },
        password: { title: 'Contraseña:', field: 'password' },
        timeout: { title: "TimeOut:", field: 'timeout' },
        retriesMax: { title: "No. reintentos de conexión:", field: 'retriesMax' },
        delay: { title: "Tiempo de espera para reintento:", field: 'delay' },
    },
};

export const messageSftpUtil = {
    msgNameRequiered: 'El nombre de conexión es requerido.',
    msgHostNameRequiered: 'El nombre de Host es requerido.',
    msgPasswordRequiered: 'La contraseña es requerida.',
    msgPortRequiered: 'El puerto es requerido.',
    msgUserNameRequired: 'El nombre de usuario es requerido.',
    msgDescriptionRequired: 'La descripción es requerida.',
};

export const messageBridgeValidation = {
    msgNameRequiered: 'El nombre es requerido.',
    msgApplicationRequiered: 'El nombre de aplicación es requerido.',

    msgSftpSourceRequiered: 'El SFTP origen es requerido.',
    msgSourceFolderRequiered: 'La ruta origen es requerida.',
    msgSourceBackupRequiered: 'La ruta de resguardo es requerida.',

    msgSftpTargetRequiered: 'El SFTP destino es requerido.',
    msgTargetFolderRequiered: 'La ruta destino es requerida.',

    msgPrivateKeyRequired: 'La llave privada es requerida.',
    msgPublicKeyRequired: 'La llave publica es requerida.',

};

export const messageFindBridge = {
    data: {
        application: { title: 'Aplicación', field: 'application' },
        name: { title: 'Nombre', field: 'name' },
        sftpSource: { title: 'SFTP Origen', field: 'sftpSource' },
        sftpTarget: { title: 'SFTP Destino', field: 'sftpTarget' },
        createdBy: { title: 'Creado por', field: 'createdBy' }
    },
};
