import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../lib/mongodb';
import { Order } from '../lib/models/Order';

async function cleanupPendingOrders() {
  try {
    await connectDB();
    
    console.log('🔍 Finding pending orders without payment intents...');
    
    // Delete pending orders that don't have a payment intent
    const result = await Order.deleteMany({
      paymentStatus: 'pending',
      $or: [
        { paymentIntentId: { $exists: false } },
        { paymentIntentId: null }
      ]
    });
    
    console.log(`✅ Deleted ${result.deletedCount} pending orders without payment intents`);
    
    // List remaining pending orders
    const remaining = await Order.find({ paymentStatus: 'pending' })
      .select('orderNumber customerEmail total paymentIntentId createdAt')
      .lean();
    
    console.log(`\n📋 Remaining pending orders: ${remaining.length}`);
    remaining.forEach(order => {
      console.log(`  - ${order.orderNumber}: ${order.customerEmail} - £${order.total} - PI: ${order.paymentIntentId || 'none'}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanupPendingOrders();
