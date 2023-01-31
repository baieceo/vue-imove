import shortcuts from '../../../../common/shortcuts';

const blankMenuConfig = [{
        key: 'selectAll',
        title: '全选',
        icon: 'icon-sam icon-sam-quanxuan',
        handler: shortcuts.selectAll.handler,
    },
    {
        key: 'paste',
        title: '粘贴',
        icon: 'icon-sam icon-sam-niantie',
        disabled: (flowChart) => flowChart.isClipboardEmpty(),
        handler: shortcuts.paste.handler,
    },
];

export default blankMenuConfig;