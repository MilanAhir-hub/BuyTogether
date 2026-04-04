import React, { useEffect, useState } from 'react';
import { getMyGroups, confirmOrder, getMyOrders } from '../../services/dealGroupService';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, ShoppingBag } from 'lucide-react';

const MyDeals = () => {
  const [groups, setGroups] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [groupsRes, ordersRes] = await Promise.all([
        getMyGroups(),
        getMyOrders()
      ]);
      
      if (groupsRes.success) setGroups(groupsRes.data);
      if (ordersRes.success) setOrders(ordersRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (groupId) => {
    setProcessing(true);
    try {
      const res = await confirmOrder(groupId);
      if (res.success) {
        // Refresh mapping
        await fetchData();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error confirming order');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-light mb-12">My <span className="font-medium text-emerald-400">Deals</span></h1>

        {loading ? (
          <div className="flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full" /></div>
        ) : (
          <div className="space-y-16">
            
            {/* Joined Groups View */}
            <section>
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-2"><Users className="text-blue-400"/> Current Groups</h2>
              {groups.length === 0 ? (
                <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 text-neutral-400 text-center">
                  You haven't joined any active deal groups yet. <Link to="/deals" className="text-emerald-400 hover:underline">Browse Deals</Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {groups.map(group => {
                    const isOrderPlaced = orders.some(o => o.dealGroupId === group.id);
                    
                    return (
                      <div key={group.id} className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                          <h3 className="text-xl font-medium mb-1"><Link to={`/deals/${group.dealId}`} className="hover:text-emerald-400">{group.dealTitle}</Link></h3>
                          <div className="flex gap-4 text-sm">
                            <span className="text-neutral-400">Deal Price: <span className="text-emerald-400 font-medium">${group.dealGroupPrice}</span></span>
                            <span className="text-neutral-400">Progress: <span className="text-white">{group.currentCount}/{group.minBuyers}</span></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                          {group.status === 'waiting' && (
                            <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full text-sm border border-orange-500/20 whitespace-nowrap">
                              <Clock size={16} /> Waiting for members
                            </div>
                          )}
                          {group.status === 'expired' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-full text-sm border border-red-500/20 whitespace-nowrap">
                              <AlertCircle size={16} /> Group Expired
                            </div>
                          )}
                          {(group.status === 'active' || group.status === 'completed') && !isOrderPlaced && (
                            <button
                              onClick={() => handleConfirmOrder(group.id)}
                              disabled={processing}
                              className="w-full md:w-auto px-6 py-2.5 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                            >
                              Confirm & Pay checkout
                            </button>
                          )}
                          {(group.status === 'active' || group.status === 'completed') && isOrderPlaced && (
                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full text-sm border border-emerald-500/20 whitespace-nowrap">
                              <CheckCircle size={16} /> Order Placed
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Confirmed Orders View */}
            <section>
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-2"><ShoppingBag className="text-emerald-400"/> My Orders</h2>
              {orders.length === 0 ? (
                <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 text-neutral-400 text-center">
                  You don't have any confirmed orders yet.
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-black border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">{order.dealTitle}</h3>
                        <p className="text-sm text-neutral-500">Order ID: {order.id.slice(0, 8)}...</p>
                      </div>
                      <div className="text-right mt-4 md:mt-0">
                        <div className="text-xl font-light text-emerald-400">${order.pricePaid}</div>
                        <div className="text-xs uppercase tracking-wider text-emerald-500 mt-1">{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        )}

      </div>
    </div>
  );
};

export default MyDeals;
