import React, { useEffect, useState } from 'react';
import { getMyGroups, confirmOrder, getMyOrders, leaveDealGroup } from '../../services/dealGroupService';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, ShoppingBag, Users } from 'lucide-react';

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

  const handleLeaveGroup = async (dealId) => {
    if (!window.confirm("Are you sure you want to leave this deal? Your ₹20 commitment fee is NON-REFUNDABLE.")) return;
    setProcessing(true);
    try {
      const res = await leaveDealGroup(dealId);
      if (res.success) {
        await fetchData();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error leaving group');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_34%,#fff7f2_100%)] text-secondary font-sans py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-light mb-12 text-secondary">My <span className="font-medium text-primary">Deals</span></h1>

        {loading ? (
          <div className="flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-none" /></div>
        ) : (
          <div className="space-y-16">
            
            {/* Joined Groups View */}
            <section>
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-2 text-secondary"><Users className="text-primary"/> Current Groups</h2>
              {groups.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-none p-8 text-slate-500 text-center">
                  You haven't joined any active deal groups yet. <Link to="/deals" className="text-primary hover:underline">Browse Deals</Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {groups.map(group => {
                    const isOrderPlaced = orders.some(o => o.dealGroupId === group.id);
                    
                    return (
                      <div key={group.id} className="bg-white border border-slate-200 rounded-none p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                        <div>
                          <h3 className="text-xl font-medium mb-1"><Link to={`/deals/${group.dealId}`} className="hover:text-primary text-secondary">{group.dealTitle}</Link></h3>
                          <div className="flex gap-4 text-sm">
                            <span className="text-slate-500">Deal Price: <span className="text-emerald-600 font-medium">${group.dealGroupPrice}</span></span>
                            <span className="text-slate-500">Progress: <span className="text-secondary font-medium">{group.currentCount}/{group.minBuyers}</span></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                          {group.status === 'waiting' && (
                            <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-4 py-2 rounded-none text-sm border border-orange-500/20 whitespace-nowrap">
                              <Clock size={16} /> Waiting for members
                            </div>
                          )}
                          {group.status === 'expired' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-none text-sm border border-red-500/20 whitespace-nowrap">
                              <AlertCircle size={16} /> Group Expired
                            </div>
                          )}
                          {(group.status === 'active' || group.status === 'completed') && !isOrderPlaced && (
                            <button
                              onClick={() => handleConfirmOrder(group.id)}
                              disabled={processing}
                              className="w-full md:w-auto px-6 py-2.5 bg-primary text-white font-semibold rounded-none hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                            >
                              Confirm & Pay checkout
                            </button>
                          )}
                          {(group.status === 'active' || group.status === 'completed') && isOrderPlaced && (
                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-none text-sm border border-emerald-500/20 whitespace-nowrap">
                              <CheckCircle size={16} /> Order Placed
                            </div>
                          )}
                          {(group.status === 'waiting' || (group.status === 'active' && !isOrderPlaced)) && (
                            <button
                              onClick={() => handleLeaveGroup(group.dealId)}
                              disabled={processing}
                              className="w-full md:w-auto px-4 py-2.5 text-red-500 font-medium hover:text-red-400 hover:bg-red-500/10 rounded-none transition-colors"
                              title="Leave this group. Note: The ₹20 commitment fee is non-refundable."
                            >
                              Leave
                            </button>
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
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-2 text-secondary"><ShoppingBag className="text-primary"/> My Orders</h2>
              {orders.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-none p-8 text-slate-500 text-center">
                  You don't have any confirmed orders yet.
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white border border-slate-200 rounded-none p-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
                      <div>
                        <h3 className="text-lg font-medium text-secondary mb-1">{order.dealTitle}</h3>
                        <p className="text-sm text-slate-400">Order ID: {order.id.slice(0, 8)}...</p>
                      </div>
                      <div className="text-right mt-4 md:mt-0">
                        <div className="text-xl font-light text-primary">${order.pricePaid}</div>
                        <div className="text-xs uppercase tracking-wider text-emerald-600 mt-1">{order.status}</div>
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
