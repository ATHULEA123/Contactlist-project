// contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/contact';

// export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// });
// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async ({ page , limit , searchTerm } = {}) => {
  
//     const response = await axios.get(API_URL, {
//       params: { page, limit, searchTerm },
//     });
//     return response.data;
//   }
// );
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page = 1, limit = 10, searchTerm = '' } = {}) => {
    const response = await axios.get(API_URL, {
      params: { page, limit, searchTerm },
    });
    return response.data;
  }
);

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  const response = await axios.post(API_URL, newContact);
  return response.data;
});

export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, updatedContact }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedContact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // console.log(action.payload.totalPages);
        state.status = 'succeeded';
        state.items = action.payload.contacts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.totalItems;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      });
  },
});

export default contactSlice.reducer;
