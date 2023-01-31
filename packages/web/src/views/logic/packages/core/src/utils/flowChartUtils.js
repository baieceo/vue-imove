export const hasCellSelected = (flowChart) => {
    return flowChart.getSelectedCellCount() > 0;
};

export const hasNodeSelected = (flowChart) => {
    return (
        flowChart.getSelectedCells().filter((cell) => cell.isNode()).length >
        0
    );
};

export const hasEdgeSelected = (flowChart) => {
    return (
        flowChart.getSelectedCells().filter((cell) => cell.isEdge()).length >
        0
    );
};

export const getSelectedNodes = (flowChart) => {
    return flowChart.getSelectedCells().filter((cell) => cell.isNode());
};

export const getSelectedEdges = (flowChart) => {
    return flowChart.getSelectedCells().filter((cell) => cell.isEdge());
};

export const toSelectedCellsJSON = (
    flowChart,
) => {
    const json = flowChart.toJSON();
    const selectedCells = flowChart.getSelectedCells();
    return {
        cells: json.cells.filter((cell) =>
            selectedCells.find((o) => o.id === cell.id),
        ),
    };
};