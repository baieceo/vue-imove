import Vue from 'vue';

import Save from './save';
import FitWindow from './fitWindow';

import Undo from './undo';
import Redo from './redo';
import Zoom from './zoom';

import FontSize from './fontSize';
import Bold from './bold';
import Italic from './italic';
import Underline from './underline';

import TextColor from './textColor';
import BgColor from './bgColor';
import BorderColor from './borderColor';
import LineStyle from './lineStyle';

import HorizontalAlign from './horizontalAlign';
import VerticalAlign from './verticalAlign';

import NodeAlign from './nodeAlign';
import BringToTop from './bringToTop';
import BringToBack from './bringToBack';

const tools = [
    [Save, FitWindow, Undo, Redo],
    [Zoom],
    [FontSize, Bold, Italic, Underline],
    [TextColor, BgColor, BorderColor, LineStyle],
    [HorizontalAlign, VerticalAlign],
    [NodeAlign, BringToTop, BringToBack]
];

tools.forEach(group => {
    group.forEach(component => {
        Vue.component(component.name, component);
    });
});

export default tools;