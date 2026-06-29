import { FinanceMetrics } from '../types/finance.types';
import { paymentService } from '../services/payment.service';
import { billingService } from '../services/billing.service';
import { walletService } from '../services/wallet.service';

export const financeApi = {
  getDashboardMetrics: async (): Promise<FinanceMetrics> => {
    // In a real app this would be a single optimized backend call.
    const payStats = await paymentService.getPaymentStatistics();
    const billStats = await billingService.getBillingSummary();
    const walletStats = await walletService.getWalletSummary();

    return {
      monthlyRevenue: payStats.totalAmount,
      pendingPayments: billStats.totalPending,
      totalTransactions: payStats.successCount + payStats.pendingCount + payStats.refundedCount,
      refundRequests: payStats.refundedCount,
      walletBalance: walletStats.balance,
      todaysCollection: 0,
      revenueGrowth: 0
    };
  }
};
