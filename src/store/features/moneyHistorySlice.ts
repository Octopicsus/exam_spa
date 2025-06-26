import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionsAPI, Transaction } from "../../api/api";
import { RootState } from "../store";

export type MoneyItem = {
    id: number
    _id?: string
    userId?: string
    userEmail?: string
    type: string
    title: string
    description: string
    amount: number
    originalAmount: number
    originalCurrency: string
    date: string
    time: string
    img: string
    color: string
    createdAt?: string
    updatedAt?: string
}

// Async thunks для работы с API
export const fetchTransactions = createAsyncThunk(
    'moneyHistory/fetchTransactions',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await transactionsAPI.getTransactions(token);
            return response.transactions.map((transaction: Transaction) => ({
                ...transaction,
                id: parseInt(transaction._id || '0', 16) % 1000000, // Создаем числовой id из _id
            }));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createTransaction = createAsyncThunk(
    'moneyHistory/createTransaction',
    async (transactionData: Omit<MoneyItem, 'id' | '_id' | 'userId' | 'createdAt' | 'updatedAt'>, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await transactionsAPI.createTransaction(token, transactionData);
            return {
                ...response,
                id: parseInt(response._id || '0', 16) % 1000000,
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTransaction = createAsyncThunk(
    'moneyHistory/updateTransaction',
    async ({ transactionId, updateData }: { transactionId: string, updateData: Partial<MoneyItem> }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await transactionsAPI.updateTransaction(token, transactionId, updateData);
            return {
                ...response,
                id: parseInt(response._id || '0', 16) % 1000000,
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'moneyHistory/deleteTransaction',
    async ({ transactionId, itemId }: { transactionId: string, itemId: number }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            
            if (!token) {
                throw new Error('No authentication token');
            }

            await transactionsAPI.deleteTransaction(token, transactionId);
            return itemId;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const moneyAdapter = createEntityAdapter<MoneyItem>()
const initialState = moneyAdapter.getInitialState({
    loading: false,
    error: null as string | null,
})

const moneyHisorySlice = createSlice({
    name: 'moneyHistory',
    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        // fetchTransactions
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                moneyAdapter.setAll(state, action.payload);
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // createTransaction
        builder
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                moneyAdapter.addOne(state, action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // updateTransaction
        builder
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.loading = false;
                moneyAdapter.upsertOne(state, action.payload);
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // deleteTransaction
        builder
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                moneyAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { clearError } = moneyHisorySlice.actions
export default moneyHisorySlice.reducer
