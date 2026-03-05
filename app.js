const SUPABASE_URL = 'https://kmmeeqinzfgtoilrabir.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dmjBNwD6KagdrBRo2TeG-w_BMAUqP_i';  // ใส่ Key ให้ครบ

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// โหลดข้อมูลวันหยุด
async function loadHolidays() {
  const { data, error } = await supabaseClient.from('holidays')
    .from('holidays')
    .select('holiday_date, holiday_name')
    .order('holiday_date', { ascending: true });

  if (error) {
    console.error('Error:', error);
    document.querySelector('#holidaysTable tbody').innerHTML = 
      '<tr><td colspan="2">เกิดข้อผิดพลาด</td></tr>';
    return;
  }

  const tbody = document.querySelector('#holidaysTable tbody');
  tbody.innerHTML = '';

  data.forEach(h => {
    const row = `<tr><td>${h.holiday_date}</td><td>${h.holiday_name}</td></tr>`;
    tbody.innerHTML += row;
  });
}

// โหลดข้อมูลพนักงาน
async function loadEmployees() {
  const { data, error } = await supabaseClient.from('employees')
    .from('employees')
    .select('displayname, active')
    .order('displayname', { ascending: true });

  if (error) {
    console.error('Error:', error);
    document.querySelector('#employeesTable tbody').innerHTML = 
      '<tr><td colspan="2">เกิดข้อผิดพลาด</td></tr>';
    return;
  }

  const tbody = document.querySelector('#employeesTable tbody');
  tbody.innerHTML = '';

  data.forEach(e => {
    const status = e.active === 'Y' ? '✅ Active' : '❌ Inactive';
    const row = `<tr><td>${e.displayname}</td><td>${status}</td></tr>`;
    tbody.innerHTML += row;
  });
}

// โหลดข้อมูลเมื่อหน้าเว็บเปิด
loadHolidays();
loadEmployees();
