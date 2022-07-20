import { createSlice } from '@reduxjs/toolkit';
import { uid } from '../utils';

const initialState = {
  items: [],
  inputTypes: [
    {
      name: 'text',
      value: 'Small Text',
    },
    {
      name: 'date',
      value: 'Date',
    },
    {
      name: 'number',
      value: 'Number',
    },
    {
      name: 'checkbox',
      value: 'Checkbox',
    },
  ],
  machinetypes: [],
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    handleTypes: (state, action) => {
      state.machinetypes = [
        ...state.machinetypes,
        {
          id: uid(),
          title: {
            name: 'title',
            label: 'Object Type',
            value: '',
            type: 'text',
            custom: false,
          },
          modalTitle: {
            name: 'modalTitle',
            value: '',
            label: 'Modal Title',
            type: 'select',
            custom: false,
          },
          name: {
            name: 'name',
            value: '',
            label: 'Name',
            type: 'text',
            custom: true,
          },
        },
      ];
    },
    handleTypeUpdate: (state, action) => {
      let types = [...state.machinetypes];
      const index = types.findIndex((f) => f.id === action.payload.id);
      types[index] = action.payload;
      state.machinetypes = [...types];
    },
    handleTypeDelete: (state, action) => {
      let types = [...state.machinetypes];
      const filterd = types.filter((f) => f.id !== action.payload.id);
      state.machinetypes = [...filterd];
    },
    addItem: (state, action) => {
      let items = [...state.items];
      state.items = [...items, action.payload];
    },
    removeItem: (state, action) => {
      let items = [...state.items];
      const filterd = items.filter((f) => f.id !== action.payload.id);
      state.items = [...filterd];
    },
    updateItem: (state, action) => {
      let items = [...state.items];
      const index = items.findIndex((f) => f.id === action.payload.id);
      items[index] = action.payload;
      state.items = [...items];
    },
    updateAllItems: (state, action) => {
      state.items = [...action.payload];
    },
  },
});

export const allState = (state) => state.machinesSlice;
export const {
  handleTypes,
  handleTypeUpdate,
  handleTypeDelete,
  addItem,
  removeItem,
  updateItem,
  updateAllItems,
} = machinesSlice.actions;
export default machinesSlice.reducer;
